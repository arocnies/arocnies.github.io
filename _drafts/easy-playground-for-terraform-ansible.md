---
layout: post
title: Easy Playground for Terraform + Ansible
---
While an initial introduction to containers and devops tools is simple, developers need practice integrating the tools in a way that allows them to experiment on their local machine.

Examples and _Hello World_ projects for single tools are accessible and easy to run locally. Connecting tools together is often done for the first time in a real project. Having a playground to experiment with integration on your local machine speeds up training and enables discovery outside the limits of an existing project.

# The Playground

![Terraform_Docker_Ansible](/assets/posts/easy-playground-for-terraform-docker-ansible/tf_ansible_playground.png){: width="972" height="589" .w-50}

Let's look at an integration playground that includes Terraform, Docker, and Ansible. Where Terraform creates containers which will be provisioned by Ansible. All running on a developer's local machine.

The goal is a learning project with a focus on Terraform+Ansible integration. Docker is ubiquitous enough to earn a spot as our stand-in cloud.

Organization of the playground is focused on a runnable starting point rather than a demonstration of how large use-cases should organize their code and files. We'll make note of those best-practices when we get to forks in the road.

# Terraform + Docker

> Docker is an odd sight in this stack. In most cases Terraform would create cloud VMs instead of local containers, which would be provisioned by Ansible.
>
> Alternatively if the stack is focus on containers, it would probably install on a platform like Kubernetes which would be deployed to with Helm Charts.
{: .prompt-info }

The Terraform stack for a few Docker containers is simple enough with the  Terraform provider [kreuzwerker/docker](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs).

Here's a stack defining a single CentOS container.
```hcl
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
  }
}
# Create a container. See (https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs/resources/container)
resource "docker_container" "container1" {
  image             = "centos:7"
  name              = "container1"
  must_run          = true
  rm                = true
  tty               = true # Keeps the container alive
}
```
# Ansible Inventory
There are multiple ways of connecting Terraform and Ansible. A key factor in deciding which approach to use is the dependency direction between infrastructure.

## Dynamic Inventory
In a production environment, an Ansible Dynamic Inventory is often the best choice. Connecting compute resources created through Terraform with Ansible this way makes for a clean interface.

Tags on VMs can be used as Ansible groups when using a dynamic inventory. Which means the contract for Terraform only knows about tagging requirements and knows nothing of Ansible (and vice versa).

> You can even use a [dynamic inventory based on Terraform state](https://github.com/adammck/terraform-inventory) (spectacular stuff! 🎉)
{: .prompt-tip }

## Terraform Output
For our playground, the Ansible inventory will be an output of the applied Terraform. This is so we can flex some Terraform muscles while still keeping a clean interface.

Notice that the inventory could be a "local_file" **resource** or an **output**. Terraform doesn't know how inventory will be used; local_file resources complicates things when dealing with the cloud and CI/CD platforms where the inventory file may not be used.

Saving the output content to file as needed allows for fewer assumptions on when and how the inventory is retrieved.

> For a local playground either option is fine. This post will use _local_file_. When using an output, save the inventory to a file using `terraform output -raw <name of output>`
{: .prompt-info }

> Remember, **[composition over inheritance](https://www.terraform.io/language/modules/develop/composition)**! If you find yourself in a situation where submodules are generating inventories, then you're probably creating an unfortunate dependency.
> Your inventory should only be known to your top module.
{: .prompt-warning }

## Inventory Content

### YamlEncode

An initial inventory can be specified directly in HCL encoded to YAML. HCL looks enough like YAML to follow the standard Ansible inventory tutorials while keeping the HCL IDE features present such as autocomplete.

```hcl
# Create inventory file in yml format
# See (https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)
resource "local_file" "ansbile_inventory" {
  content = yamlencode({
    all : {
      vars : { ansible_connection : "docker" }
      hosts : {
        container1 : {}
      }
    }
  })
  filename = "inventory.yml"
}
```

### Static INI Inventory

The equivalent INI based Ansible inventory is
```hosts.ini
container1

[all:vars]
ansible_connection=docker
```

A manually created INI file is a good alternative. Both cases have the follow-up steps of implementing looping over the hosts. The static INI inventory becomes a template while the _yamlencode_ inventory is built with HCL functions.

> Starting with YAML encoded inventory will lead to learning on HCL language skills when in using the playground.
>
> Use a manual INI file to explore more advanced Ansible inventory uses.

For example, using the _yamlencode_ approach one can loop over AWS EC2s and build an inventory with `zipmap()`
```hcl
resource "local_file" "ansbile_inventory" {
  content = yamlencode({
    all : {
      hosts : zipmap(aws_instance.workers[*].tags.Name, [
        for ip in aws_instance.workers[*].private_ip : {
          ansible_host : ip
        }
      ])
    }
  })
}
```

# Integration

Terraform and Ansible serve complementary responsibilities. Terraform creates infrastructure resources and Ansible provisions resources.

Since Terraform is capable of executing commands on remote hosts, the line between these responsibilities should be kept clear. A useful guide is "Terraform stops once the resources are accessible".

Setting up SSH and installing configuration-management agents (i.e. Chef or Salt) are Terraform responsibilities. Updating packages and configuring additional user accounts are Ansible responsibilities.

##

---
- Other ways of doing it
  - Ansible Terraform Module https://docs.ansible.com/ansible/latest/collections/community/general/terraform_module.html
  - etc
