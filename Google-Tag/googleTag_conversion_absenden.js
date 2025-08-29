<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11396548672"> </script>
<script>

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    gtag('js', new Date());
    gtag('config', 'AW-11396548672', {anonymize_ip: true});


    // reportet Convs an GoogleAds
    function gtag_report_conversion_contact() {
        gtag('event', 'conversion', {
        'send_to': 'AW-11396548672/hFg7CLDwioobEMCQproq',
        'value': 1.0,
        });
    }

    // Conversion wenn mail tatsächlich abgeschickt wird
    document.addEventListener('wpcf7mailsent', function() {
        console.log("Formular erfolgreich gesendet. \n");
        gtag_report_conversion_contact();
    });
    function gtag_report_conversion_jetztBewerben() {
        gtag('event', 'conversion', {
            'send_to': 'AW-11396548672/1r8TCLm_kpAbEMCQproq',
            'value': 1.0,
        });
    }
    // conversion for the aplication button
    const jetztBewerben = document.querySelector('a[href=mailto:bewerbung@between-the-lines.de"]');
    jetztBewerben.addEventListener('click', function()){
        gtag_report_conversion_jetztBewerben();
    }
</script>


