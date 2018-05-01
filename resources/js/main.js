var runden = function( zahl, stellen ) {
    var gerundet, faktor;

    faktor = Math.pow(10, stellen);
    gerundet = Math.round( zahl*faktor ) / faktor;
    return gerundet;
}



var Dreieck = function (p1x, p1y, p2x, p2y, p3x, p3y) {
    this.p1x = p1x || 1;
    this.p1y = p1y || 1;
    this.p2x = p2x || 1;
    this.p2y = p2y || 100;
    this.p3x = p3x || 100;
    this.p3y = p3y || 1;
    this.lengthp12 = Math.sqrt(Math.pow((this.p1y - this.p2y), 2) + Math.pow((this.p1x - this.p2x), 2));
    this.lengthp23 = Math.sqrt(Math.pow((this.p2y - this.p3y), 2) + Math.pow((this.p2x - this.p3x), 2));
    this.lengthp31 = Math.sqrt(Math.pow((this.p3y - this.p1y), 2) + Math.pow((this.p3x - this.p1x), 2));
    this.umfang = this.lengthp12 + this.lengthp23 + this.lengthp31;
    this.umfanghalbe = this.umfang / 2;
    this.flaeche = Math.sqrt(this.umfanghalbe * (this.umfanghalbe - this.lengthp12) * (this.umfanghalbe - this.lengthp23) * (this.umfanghalbe - this.lengthp31));
    this.node = this.build();
    this.ctx = this.node.getContext('2d');
}


Dreieck.prototype.canvasSizeX = function () {
    if (this.p1x * 1 > this.p2x * 1 && this.p1x * 1 > this.p3x * 1) {
        this.canvasX = this.p1x;
        console.log('(this.p1x > this.p2x && this.p1x > this.p3x)', this.canvasX * 1 + 1)
        return this.canvasX * 1 + 1;
    } else if (this.p2x * 1 > this.p1x * 1 && this.p2x * 1 > this.p3x * 1) {
        this.canvasX = this.p2x;
        console.log('(this.p2x > this.p1x && this.p2x > this.p3x)', this.canvasX * 1 + 1)
        return this.canvasX * 1 + 1;
    } else if (this.p3x * 1 > this.p2x * 1 && this.p3x * 1 > this.p1x * 1) {
        this.canvasX = this.p3x;
        console.log('(this.p3x > this.p2x && this.p3x > this.p1x)', this.canvasX * 1 + 1)
        return this.canvasX * 1 + 1;
    }
};


Dreieck.prototype.canvasSizeY = function () {
    if (this.p1y * 1 > this.p2y * 1 && this.p1y * 1 > this.p3y * 1) {
        this.canvasY = this.p1y;
        console.log('this.cY', this.canvasY);
        console.log('this.p2y', this.p1y);
        console.log('(this.p1y > this.p2y && this.p1y > this.p3y)', this.canvasY * 1 + 1)
        return this.canvasY * 1 + 1;

    } else if (this.p2y * 1 > this.p1y * 1 && this.p2y * 1 > this.p3y * 1) {
        this.canvasY = this.p2y;
        console.log('this.cY', this.canvasY);
        console.log('this.p2y', this.p2y);
        console.log('(this.p2y > this.p1y && this.p2y > this.p3y)', this.canvasY * 1 + 1)
        return this.canvasY * 1 + 1;
    } else if (this.p3y * 1 > this.p2y * 1 && this.p3y * 1 > this.p1y * 1) {
        this.canvasY = this.p3y;
        console.log('(this.p3y > this.p2y && this.p3y > this.p1y)', this.canvasY * 1 + 1)
        return this.canvasY * 1 + 1;
    }
};


Dreieck.prototype.build = function () {
    return $('<canvas>')
        .attr('width', this.canvasSizeX())
        .attr('height', this.canvasSizeY())
        .get(0);
}


Dreieck.prototype.draw = function () {
    var d = this.ctx;
    d.clearRect(0, 0, this.canvasSizeX(), this.canvasSizeY());

    d.lineWidth = 1;
    d.strokeStyle = '#ccc';
    d.moveTo(this.p1x, this.p1y);
    d.lineTo(this.p2x, this.p2y);
    d.lineTo(this.p3x, this.p3y);
    d.lineTo(this.p1x, this.p1y);
    d.stroke();
};


var dreiecke = [];
var input = [];
$(document).ready(function () {
    $('button').on('click', function (event) {
        event.preventDefault();
        input.push($('#p1x').val());
        input.push($('#p1y').val());
        input.push($('#p2x').val());
        input.push($('#p2y').val());
        input.push($('#p3x').val());
        input.push($('#p3y').val());
        dreiecke.unshift(input);
        input = []


        $('#ausgabe').html('');
        for (var i = 0 in dreiecke) {
            var SeiteA = `drei1SeiteA${i}`;
            var SeiteB = `drei1SeiteB${i}`;
            var SeiteC = `drei1SeiteC${i}`;
            var umfangadd = `drei1Umfang${i}`;
            var flaecheadd = `drei1Flaeche${i}`;

            var name = 'dreieck' + i
            name = new Dreieck(dreiecke[i][0], dreiecke[i][1], dreiecke[i][2], dreiecke[i][3], dreiecke[i][4], dreiecke[i][5]);

            var div = $('<div>').html(
                `
            <div class="wrapper">
            <div class="info">
            <h1>Dreieck Daten</h1>
            <div>
            <p>Punkt 1: (${name.p1x}/${name.p1y})</p>
            <p>Punkt 2: (${name.p2x}/${name.p2y})</p>
            <p>Punkt 3: (${name.p3x}/${name.p3y})</p>
            </div>
            <p>Länge a: <span id="drei1SeiteA${i}"></span></p>
            <p>Länge b: <span id="drei1SeiteB${i}"></span></p>
            <p>Länge c: <span id="drei1SeiteC${i}"></span></p>
            <p>Umfang des Dreiecks: <span id="drei1Umfang${i}"></span></p>
            <p>Fläche des Dreiecks: <span id="drei1Flaeche${i}"></span></p>
            </div>
            <div class="container"></div>
            </div>`
            )
            div.appendTo('#ausgabe');

            $('#' + SeiteA).html(runden(name.lengthp12, 2) + 'px');

            $('#' + SeiteB).html(runden(name.lengthp23, 2) + 'px');

            $('#' + SeiteC).html(runden(name.lengthp31, 2) + 'px');

            $('#' + umfangadd).html(runden(name.umfang, 2) + 'px');

            $('#' + flaecheadd).html(runden(name.flaeche, 2) + 'px<sup>2</sup>');

            $(name.node).appendTo(div.find('.container'));
            name.draw();
        }

    });

});
