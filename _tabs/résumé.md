---
# the default layout is 'page'
icon: fas fa-id-card
order: 5
---

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
