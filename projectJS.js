function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function clearForm() {
    if (confirm("Are you sure you want to clear the form?")) {
        document.querySelector('form').reset();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input[value="Print Page"]').addEventListener('click', printPage);
    document.querySelector('input[value="Download Page"]').addEventListener('click', downloadPage);
    document.querySelector('input[value="Clear Form"]').addEventListener('click', clearForm);
});
function printPage() {
    let printWindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    printWindow.document.write('<html><head><title>' + document.title + '</title>');
    printWindow.document.write('<link rel="stylesheet" href="style.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.getElementById('formContent').innerHTML);

    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = function () {
        var formElements = document.forms[0].elements;
        for (var i = 0; i < formElements.length; i++) {
            var elementType = formElements[i].type.toLowerCase();
            switch (elementType) {
                case 'text':
                case 'email':
                case 'textarea':
                    printWindow.document.forms[0].elements[i].value = formElements[i].value;
                    break;
            }
        }

        setTimeout(function () {
            printWindow.print();
            printWindow.close();
        }, 500);
    };
}

function downloadPage() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Your Meal Plan", 10, 10);

    const formElements = document.forms[0].elements;
    let yPos = 20;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type === "text" || element.type === "email" || element.tagName.toLowerCase() === "textarea") {
            let text = `${element.name}: ${element.value}`;
            text = text.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            doc.text(text, 10, yPos);
            yPos += 10;
            if (yPos > 280) {
                doc.addPage();
                yPos = 10;
            }
        }
    }

    doc.save('meal-plan.pdf');
}

function fillFormForDebugging() {
    document.getElementById('name').value = "John Doe";
    document.getElementById('email').value = "john.doe@example.com";
}