// Satır Ekle
function addRow() {
  var tbody = document.querySelector("#myTable tbody");
  var yerAdi = prompt("Yer adı giriniz:");

  if (yerAdi === null || yerAdi.trim() === "") {
    return;
  }

  var yenisatir = document.createElement("tr");
  yenisatir.id = "" + (tbody.children.length + 1);
  var yenith = document.createElement("th");
  yenith.textContent = yerAdi;
  yenisatir.appendChild(yenith);
  tbody.appendChild(yenisatir);

  for (var i = 0; i < 7; i++) {
    var yenitd = document.createElement("td");
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    var id = "" + (tbody.children.length + 1) + (i + 1);
    input.setAttribute("id", id);
    yenitd.appendChild(input);
    yenisatir.appendChild(yenitd);
  }

  tbody.appendChild(yenisatir);
}

// Satır Silme Butonu
function deleteLastRow() {
  var tablo = document.getElementById("myTable");
  var satirsayisi = tablo.rows.length;

  if (satirsayisi > 1) {
    tablo.deleteRow(satirsayisi - 1);
  } else {
    alert("Tabloda silinecek satır bulunmamaktadır.");
  }
}

// Range Değerler
function showValue(newValue, elementId) {
  document.getElementById(elementId).innerText = newValue;
}
document.getElementById("form1").addEventListener("input", function (event) {
  showValue(event.target.value, "ulaşımMaliyetiValue");
});

document.getElementById("form2").addEventListener("input", function (event) {
  showValue(event.target.value, "ulaşımSuresiValue");
});

document.getElementById("form3").addEventListener("input", function (event) {
  showValue(event.target.value, "Konaklama Maliyeti");
});

document.getElementById("form4").addEventListener("input", function (event) {
  showValue(event.target.value, "Konaklama Süresi");
});

document.getElementById("form5").addEventListener("input", function (event) {
  showValue(event.target.value, "Merkeze Uzaklık");
});

document.getElementById("form6").addEventListener("input", function (event) {
  showValue(event.target.value, "Değerlendirme Puanı");
});

document.getElementById("form7").addEventListener("input", function (event) {
  showValue(event.target.value, "Hava Sıcaklığı");
});

// Sonucu Göster Butonu
function showResult() {
  var table = document.getElementById("myTable");
  var goster = document.getElementById("alt-kart1");
  var goster2 = document.getElementById("alt-kart2");

  var range1 = document.getElementById("form1").value;
  var range2 = document.getElementById("form2").value;
  var range3 = document.getElementById("form3").value;
  var range4 = document.getElementById("form4").value;
  var range5 = document.getElementById("form5").value;
  var range6 = document.getElementById("form6").value;
  var range7 = document.getElementById("form7").value;

  var deger =
    parseFloat(range1) +
    parseFloat(range2) +
    parseFloat(range3) +
    parseFloat(range4) +
    parseFloat(range5) +
    parseFloat(range6) +
    parseFloat(range7);

  if (deger == 1 || (deger > 0.9 && deger < 1.1)) {
    goster.style.display = "flex";
    goster2.style.display = "inline-block";

    var sutunToplamlari = new Array(table.rows[0].cells.length - 1).fill(0);

    for (var i = 1; i < table.rows.length; i++) {
      for (var j = 1; j < table.rows[0].cells.length; j++) {
        var inputValue = parseFloat(
          table.rows[i].cells[j].querySelector("input").value
        );
        sutunToplamlari[j - 1] += Math.pow(inputValue, 2);
      }
    }
    var toplamAgirlikDizisi = [];
    var toplamAgirlikDizisi2 = [];
    var toplamdegerler = [];
    var toplamdegerler2 = [];
    // Sütun toplamlarını kullanarak işlemleri yap
    for (var k = 0; k < sutunToplamlari.length; k++) {
      sutunToplamlari[k] = Math.sqrt(sutunToplamlari[k]);

      // En yüksek weightedValue'ı saklamak için değişken tanımla
      var sutunenyuksekdeger = 0;
      var sutunendusukdeger = Number.MAX_VALUE;
      var enYuksekDegerler = [];
      var enDusukDegerler = [];
      var agirlik = [];
      var agirlik2 = [];
      // Her sütunun ilk hücresine bölme işlemi
      for (var m = 1; m < table.rows.length; m++) {
        var inputValue = parseFloat(
          table.rows[m].cells[k + 1].querySelector("input").value
        );

        // Kontrol: Geçerli bir sayı mı? ve sütun toplamı sıfırdan farklı mı?
        if (!isNaN(inputValue) && sutunToplamlari[k] !== 0) {
          // Her satırdaki değeri sütun toplamına böl
          var normalizedValue = inputValue / sutunToplamlari[k];
          console.log("Normalize Değer: ", normalizedValue);
          // Her bir sütunu range değeriyle çarp
          var weightedValue =
            normalizedValue *
            [range1, range2, range3, range4, range5, range6, range7][k];

          agirlik.push(weightedValue);
          agirlik2.push(weightedValue);
          // En yüksek weightedValue'ı güncelle
          sutunenyuksekdeger = Math.max(sutunenyuksekdeger, weightedValue);
          sutunendusukdeger = Math.min(sutunendusukdeger, weightedValue);
          enYuksekDegerler.push(sutunenyuksekdeger);
          enDusukDegerler.push(sutunendusukdeger);
          // Sonucu yazdır veya başka bir şey yap
          console.log(
            `Sütun ${
              k + 1
            }, Satır ${m} Ağırlıklandırılmış Normalize Değer: ${weightedValue} En Düşük Değer: ${sutunendusukdeger} En Yüksek Değer: ${sutunenyuksekdeger}`
          );
        }
      }
      enYuksekDegerler = Math.max(...enYuksekDegerler);
      enDusukDegerler = Math.min(...enDusukDegerler);
      console.log(
        `enyüksek değer: ${enYuksekDegerler} en düşük değer: ${enDusukDegerler} Ağırlıklandırılmış Normalize Değerler : ${agirlik}`
      );
      var agirlikdizi = [];
      for (var n = 0; n < agirlik.length; n++) {
        agirlik[n] -= enYuksekDegerler;
        agirlik[n] = Math.pow(agirlik[n], 2);
        agirlikdizi.push(agirlik[n]);
      }
      toplamAgirlikDizisi.push(agirlikdizi);

      var agirlikdizi2 = [];
      for (var n = 0; n < agirlik2.length; n++) {
        agirlik2[n] -= enDusukDegerler;
        agirlik2[n] = Math.pow(agirlik2[n], 2);
        agirlikdizi2.push(agirlik2[n]);
      }
      toplamAgirlikDizisi2.push(agirlikdizi2);

      console.log(
        "İdeal Olan Noktalara Uzaklık Değeri: ",
        toplamAgirlikDizisi,
        "İdeal Olmayan Noktalara Uzaklık Değeri: ",
        toplamAgirlikDizisi2
      );
    }

    for (var l = 0; l < toplamAgirlikDizisi[0].length; l++) {
      var toplam = 0;

      for (var r = 0; r < toplamAgirlikDizisi.length; r++) {
        toplam += toplamAgirlikDizisi[r][l];
      }
      var toplamkok = Math.sqrt(toplam);
      toplamdegerler.push(toplamkok);
    }

    for (var l = 0; l < toplamAgirlikDizisi2[0].length; l++) {
      var toplam = 0;

      for (var r = 0; r < toplamAgirlikDizisi2.length; r++) {
        toplam += toplamAgirlikDizisi2[r][l];
      }
      var toplamkokeksi = Math.sqrt(toplam);
      toplamdegerler2.push(toplamkokeksi);
    }
    console.log("Si*:", toplamdegerler, "Si-:", toplamdegerler2);
    var finalci = [];
    finalci.push(toplamdegerler, toplamdegerler2);

    var toplamDizisi = [];

    if (toplamdegerler.length === toplamdegerler2.length) {
      for (var i = 0; i < toplamdegerler.length; i++) {
        var toplam =
          toplamdegerler2[i] / (toplamdegerler[i] + toplamdegerler2[i]);
        toplamDizisi.push(toplam);
      }

      console.log("Ci*: ", toplamDizisi);
    } else {
      console.log("Dizilerin boyutları eşit değil.");
    }

    var en_iyi_sonuc = Math.max(...toplamDizisi);
    var en_kotu_sonuc = Math.min(...toplamDizisi);

    var enIyiSonucIndeks = toplamDizisi.indexOf(en_iyi_sonuc);
    var enKotuSonucIndeks = toplamDizisi.indexOf(en_kotu_sonuc);
    var enIyiSonucSatir = enIyiSonucIndeks + 1;
    var enKotuSonucSatir = enKotuSonucIndeks + 1;
    if (table.rows.length > 16) {
      var enIyiSonucTh = document
        .querySelector("#myTable tbody")
        .rows[enIyiSonucSatir + 0].querySelector("th");
      var enKotuSonucTh = document
        .querySelector("#myTable tbody")
        .rows[enKotuSonucSatir + 0].querySelector("th");
    } else {
      var enIyiSonucTh = document
        .querySelector("#myTable tbody")
        .rows[enIyiSonucSatir - 1].querySelector("th");
      var enKotuSonucTh = document
        .querySelector("#myTable tbody")
        .rows[enKotuSonucSatir - 1].querySelector("th");
    }

    var enIyiSonucThIcerik = enIyiSonucTh.textContent;
    var enKotuSonucThIcerik = enKotuSonucTh.textContent;

    document.querySelector("#alt-kart1 .card-text").innerHTML =
      "En İyi Seçim: " + enIyiSonucThIcerik + "<br>Sonuç: " + en_iyi_sonuc;

    document.querySelector("#alt-kart2 .card-text").innerHTML =
      "En Kötü Seçim: " + enKotuSonucThIcerik + "<br>Sonuç: " + en_kotu_sonuc;
  } else {
    alert("Lütfen Önem Derecelerinin toplam değerini 1 olarak ayarlayınız.");
  }
}

function removeResult() {
  window.location.reload();
}

function excelToJson(fileInputId) {
  var input = document.getElementById(fileInputId);
  var file = input.files[0];

  var reader = new FileReader();

  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: "array" });

    var sheet = workbook.Sheets[workbook.SheetNames[0]];

    var jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });

    var table = document.getElementById("myTable");
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }

    var table = document.getElementById("myTable");
    var headerRow = table.insertRow(0);
    for (var j = 0; j < Object.keys(jsonData[0]).length; j++) {
      var headerCell = document.createElement("th");
      headerCell.innerHTML = Object.keys(jsonData[0])[j];
      headerRow.appendChild(headerCell);
    }
    for (var i = 1; i < jsonData.length; i++) {
      var newRow = table.insertRow(table.rows.length);

      for (var j = 0; j < Object.keys(jsonData[i]).length; j++) {
        var cellId = i + "" + (j + 1);
        var newCell;

        if (j === 0) {
          newCell = document.createElement("th");
          newCell.innerHTML = jsonData[i][Object.keys(jsonData[i])[j]];
        } else {
          newCell = newRow.insertCell(j - 1);
          newCell.innerHTML =
            '<input type="text" id="' +
            cellId +
            '" value="' +
            jsonData[i][Object.keys(jsonData[i])[j]] +
            '" />';
        }
        newRow.appendChild(newCell);
      }
    }
    console.log(jsonData);
  };
  reader.readAsArrayBuffer(file);
}
