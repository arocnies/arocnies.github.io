---
title: SSH Essentials
date: 2022-04-13 12:23:10 -0400
categories: [Linux]
tags: [ssh, linux, configuration, devops, proxy, bastion]
author: anies
thumbnail: /assets/posts/ssh-tunnels/ssh-tunnel-1.png
---
<style>
pre { padding: 10px }
cdest { color: #f8359b }
cproxy { color: #d436d6 }
cviolet { color: #bc7cfa }
clocal { color: #5c53fa }
</style>

Accessing hosts in a dynamic environment, on-the-fly SSH exploring, without the help of Google or StackOverflow can be challenging. Especially when there are multiple bastions, varying credentials, or the need to forward ports. It's good to take stock of a few SSH basics to avoid getting slowed down in the ever-present `--help` text and `man` pages.

One of the projects I've been working on includes a suite of cloud machines in OpenStack. The machines are spread between two clusters, each cluster with two domains, each domain with multiple projects.

Managing these machines with Terraform, Ansible, or other config-as-code tools is ideal. However, the need for pure and simple SSH access is still present--either in the absence or in addition to provisioning tools.

# Port Forwarding
The command to forward a port using the `-L` option is
<pre class="highlighter-rouge">
ssh -L <clocal>local_port</clocal>:<cdest>dest_ip</cdest>:<cdest>dest_port</cdest> <cproxy>proxy_user@proxy_ip</cproxy>
</pre>

![Test image](/assets/posts/ssh-tunnels/ssh-tunnel-1.png)

Nothing too special. The main thing to note here is the potentially confusing argument order. It would feel natural to have an order of “source → proxy → destination”. However, the arguments are typed as “source → destination → proxy”.

Even with the odd argument ordering, dealing with a single hop is trivial. It’ll be worthwhile to visualize it for when we proxy through multiple machines:

Running the command will drop us into a shell on the proxy machine. Exiting the terminal will close the tunnel. Arguments are available to leave the tunnel open in the background without opening a shell on the proxy.

## Destination *localhost*

While a single tunnel can span three machines, there is a convenience case to be made for using extra tunnels. It's often easier for the humans involved to use `localhost` as the destination since it simplifies the command when using multiple tunnels.

<pre class="highlighter-rouge">
ssh -L <clocal>local_port</clocal>:<cdest><b>127.0.0.1</b></cdest>:<cdest>dest_port</cdest> <cproxy>proxy_user@proxy_ip</cproxy>
</pre>

The destination is **relative to the proxy machine**. This makes sense considering that in most use-cases the host machine cannot reach the final destination except through the proxy. When the destination is localhost, the destination is the proxy machine.

![Test image](/assets/posts/ssh-tunnels/ssh-tunnel-2.png)

Tunnels chained together with `localhost` are easy conceptualize and allow fallback into a shell on all of the intermediate proxy machines. The only variable part of the SSH command between each shell is next destination.

It's easier to build a linked list adding one element to the tail at a time, rather than in pairs. Forwarding one jump at a time removes the variety that comes with an odd number of hosts.

In cases where we do not want to fallback into shells on any of these machines, there are easier methods to create a tunnel spanning multiple hosts.

![Test image](/assets/posts/ssh-tunnels/ssh-tunnel-3.png)

# Jump Host
The option to jump through a host before reaching the final destination is `-J`. While easy to write, the downside to this approach is jumps requiring varying credentials or other SSH options in the chain spoil the ease its use.

Despite being an easy to discover option, it's worthy of a reminder. Many resource will direct users to the more complex alternative of `-o ProxyCommand=""` and fail to mention the easier to use `-J` option
<pre class="highlighter-rouge">
ssh -J <cproxy>proxy_user@proxy_ip</cproxy> <cdest>user@host</cdest>
</pre>

We can chain together multiple jump hosts with comma
<pre class="highlighter-rouge">
ssh -J <cproxy>proxy1</cproxy>,<cproxy>proxy2</cproxy>,<cproxy>proxy3</cproxy> <cdest>dest</cdest>
</pre>

Jump hosts can be combined with forwarding a port to create a tunnel spanning multiple machines.
<pre class="highlighter-rouge">
ssh -L <clocal>port</clocal>:<cdest>localhost</cdest>:<cdest>port</cdest> -J <cproxy>proxy1</cproxy>,<cproxy>proxy2</cproxy>,<cproxy>proxy3</cproxy> <cdest>dest</cdest>
</pre>

# SSH Config

All of these options can be baked into an SSH config. A well maintained SSH config removes the need for passing any arguments for the command line. Even when host options change on a daily basis, updating an SSH config is likely going to be worth the effort.

## LocalForward & ProxyJump
The port forwarding equivalent of `-L` for an SSH config file is `LocalForward`.

The proxying equivalent of `-J` for an SSH config file is `JumpProxy`.

This example adds common options and comments
```shell
Host prod-nifi
  Hostname 1.1.1.1
  User centos
  Identity ~/.ssh/id_rsa
  # NiFi console              <-- Comments can help explain intent
  LocalForward 8080
  JumpHost alice.company@2.2.2.2
```
{: file='~/.ssh/config'}
## Host patterns

Host patterns and named hosts are what make maintaining an SSH config in a dynamic environment feasible.
Entries with patterns apply options to groups of hosts.

Watch out for circular pattern matching--which will cause SSH commands to hang. This example uses a naming convention to prefix prod machines with `prod-` and use the `prod-*` pattern. Which means the production bastion host must avoid that pattern by choosing a different name (i.e. `bastion-prod` instead of `prod-bastion`).

If there are options common to all bastions, the patterns `bastion-*` or `*bastion*` would work using the example naming scheme.

```shell
Host bastion-prod
  Hostname 2.2.2.2
  User alice.company
  Identity ~/.ssh/id_rsa

# Applies to all prod machines
Host prod-*
  User centos
  Identity ~/.ssh/prod_rsa
  JumpHost bastion-prod

Host prod-nifi
  Hostname 1.1.1.1
  LocalForward 8080
```
{: file='~/.ssh/config'}

# Conclusion
Familiarization with forwarding ports, simple handling of jump hosts, and how to organize host options in a config creates a solid foundation for most use-cases.

Building on this foundation, the `man` pages for `ssh` and `ssh_config` will introduce new and more powerful additions for each of these essential skills.
