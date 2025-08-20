<!-- Event snippet for Kontakt (1) conversion page
In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->

<script>
// First thinkz first Anonymisieren der Ips. Muss passieren bevor conversion reportiert wird!
window.dataLayer = window.dataLayer || []; // window.datalayer nutzen oder window.dataLayer erstellen

// arguments ist ein eingebautes Objekt Standard API von GoogleADS
function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); // new Date()->Zeitstempel
    //  Ip-Anonymisierung starten -> DSVGO_Konform -> Kein Banner nötig!
    gtag('config', 'AW-11396548672', {
        'anonymize_ip': true
    }); // Objekte in {}?!


// reportet Convs an GoogleAds
function gtag_report_conversion() {
    gtag('event', 'conversion', {
      'send_to': 'AW-11396548672/hFg7CLDwioobEMCQproq',
    });
    return false;
}
// Conversion wenn mail tatsächlich abgeschickt wird
document.addEventListener('wpcf7mailsent',function(event) {
    console.log("Formular erfolgreich gesendet. \n");
    gtag_report_conversion()
});
// Wenn der Submit Knopf geklickt wird (ohne notwendigkeit von senden )
document.querySelector('.wpcf7-submit').addEventListener('click', function(event) {
  console.log("Button wurde geklickt!");
});
// 20/08/2025
</script>


