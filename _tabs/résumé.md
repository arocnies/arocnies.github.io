---
# the default layout is 'page'
icon: fas fa-id-card
order: 5
---

<div id="resumeForm">
  <div markdown="1">
  > I will not contact you based on this form, so please contact me instead!
  {: .prompt-tip }
  </div>
  <div class="card text-dark bg-light mb-3">
    <div class="card-header">
      <p class="lead">First, tell me about you . . .</p>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="formName">Full Name</label>
          <input type="text" id="formName" name="Name" class="form-control" placeholder="First Last">
        </div>
        <div class="form-group">
          <label for="formEmail">Email Address</label>
          <input type="email" id="formEmail" name="Email" class="form-control" aria-describedby="emailHelp" placeholder="name@example.com">
        </div>
        <div class="form-group">
          <label for="formCompany">Company</label>
          <input type="text" id="formCompany" name="Company" class="form-control" placeholder="Company or Organization">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>


<div markdown="1" id="resumeDownload" style="display:none;">

> <a href="https://docs.google.com/document/d/1Og1zzR4Y7xDd7TXLfCpoDWyEZUk5Ry3khXOzSiXagpQ/export?format=pdf">Download PDF</a>.
{: .prompt-tip }

<div id="adobe-dc-view" style="width: 800px;"></div>
<script src="https://documentcloud.adobe.com/view-sdk/viewer.js"></script>
<script type="text/javascript">
  document.addEventListener('adobe_dc_view_sdk.ready', function () {
    var adobeDCView = new AdobeDC.View({
{% if jekyll.environment == "development" %}
      clientId: '2a26dd72d63c4d77b8572e10b48220ea',
{% else %}
      clientId: 'd63a7076bb914fcb8960a5a56de13b6a',
{% endif %}
      divId: 'adobe-dc-view',
    });
    adobeDCView.previewFile(
      {
        content: { location: { url: 'https://docs.google.com/document/d/1Og1zzR4Y7xDd7TXLfCpoDWyEZUk5Ry3khXOzSiXagpQ/export?format=pdf' } },
        metaData: { fileName: 'aaron_nies_resume.pdf' },
      },
      {
        embedMode: 'IN_LINE',
        showDownloadPDF: true,
        showPrintPDF: false,
      }
    );
  });
</script>
</div>


<script>
  const urlParams = new URLSearchParams(window.location.search);
  const formName = urlParams.get('Name');
  const formEmail = urlParams.get('Email');
  const formCompany = urlParams.get('Company');

  if (formName && formEmail && formCompany) {
    document.getElementById("resumeDownload").style.display = "block";
    document.getElementById("resumeForm").style.display = "none";
  }
</script>
