---
# the default layout is 'page'
icon: fas fa-id-card
order: 5
---

> <a href="../assets/pdf/aaron_nies_resume.pdf">Download PDF</a>.
{: .prompt-tip }

<div id="adobe-dc-view" style="width: 800px;"></div>
<script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
<script type="text/javascript">
  document.addEventListener('adobe_dc_view_sdk.ready', function () {
    var adobeDCView = new AdobeDC.View({
      clientId: '9ce015226bde4a849c34d79309a80318',
      divId: 'adobe-dc-view',
    });
    adobeDCView.previewFile(
      {
        content: { location: { url: '../assets/pdf/aaron_nies_resume.pdf' } },
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
