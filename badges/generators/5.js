generators[ genId++ ] = function(g, ctx, s, seed, unit) {

    PRNG.setSeed(seed || 0);

    g.ctx.globalAlpha = 1;
    var count = 50;

    var turns = 5;
    var total = Math.PI * 2 * turns;
    var minRadius = s / 5;
    var maxRadius = minRadius + s / 5;
    var ga = ( ( 1 + Math.sqrt(5) ) / 2 ) / 5;
    var points = [];
    var i = 0;
    ctx.save();
    ctx.translate(s / 2, s / 2);
    ctx.beginPath();
    var sca = .0005 / unit;
    for (var angle = 0; angle <= total; angle += ga) {

        var radius = map(angle, 0, total, minRadius, maxRadius);
        var x = Math.cos(angle) * radius * .75;
        var y = Math.sin(angle) * radius;
        points.push([x, y]);

        ctx.moveTo(x, y);
        var ang = ( PRNG.FBM(x * sca, y * sca) * Math.PI * 4 ) + PRNG.random();

        x += Math.cos(ang) * radius * .25;
        y += Math.sin(ang) * radius * .25;
        ctx.lineTo(x, y);
        points.push([x, y]);
    }

    var delaunay = new Delaunator(points);
    var tris = delaunay.triangles;
    ctx.beginPath();
    for (i = 0; i < tris.length;) {

        drawTri(ctx, points, tris[i++], tris[i++], tris[i++]);

    }
    ctx.stroke();
    ctx.restore();

    function drawTri(ctx, ps, a, b, c) {

        if (PRNG.random() > .35) return false;

        ctx.moveTo(ps[a][0], ps[a][1]);
        ctx.lineTo(ps[b][0], ps[b][1]);
        ctx.lineTo(ps[c][0], ps[c][1]);
        ctx.lineTo(ps[a][0], ps[a][1]);

//            if( PRNG.random() > .5 )return;

        var cx0 = lerp(.25, ps[a][0], ps[b][0]);
        var cy0 = lerp(.25, ps[a][1], ps[b][1]);
        var cx00 = lerp(.75, ps[a][0], ps[b][0]);
        var cy00 = lerp(.75, ps[a][1], ps[b][1]);

        var cx1 = lerp(.25, ps[b][0], ps[c][0]);
        var cy1 = lerp(.25, ps[b][1], ps[c][1]);
        var cx10 = lerp(.75, ps[b][0], ps[c][0]);
        var cy10 = lerp(.75, ps[b][1], ps[c][1]);

        var cx2 = lerp(.25, ps[c][0], ps[a][0]);
        var cy2 = lerp(.25, ps[c][1], ps[a][1]);
        var cx20 = lerp(.75, ps[c][0], ps[a][0]);
        var cy20 = lerp(.75, ps[c][1], ps[a][1]);

        ctx.moveTo(cx00, cy00);
        ctx.lineTo(cx1, cy1);

        ctx.moveTo(cx10, cy10);
        ctx.lineTo(cx2, cy2);

        ctx.moveTo(cx20, cy20);
        ctx.lineTo(cx0, cy0);

    }
    return PORTRAIT;
}
