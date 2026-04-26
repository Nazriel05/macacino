<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Readfolio Reader</title>

@vite(['resources/css/app.css','resources/css/reader.css'])

</head>
<body class="bg-gray-100">

<div class="topbar">
    <h1>📘 Readfolio</h1>

    <div>
        <button onclick="zoomOut()">-</button>
        <button onclick="zoomIn()">+</button>
    </div>
</div>

<div id="pdf-container"></div>

<div id="ai-popup" class="hidden">
    <button onclick="translateText()">Translate</button>
    <button onclick="explainText()">Explain</button>
</div>

<div id="warning-box" class="hidden"></div>

<script>
const pdfUrl = "{{ $pdfUrl }}";
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

@vite(['resources/js/app.js','resources/js/reader.js'])

</body>
</html>