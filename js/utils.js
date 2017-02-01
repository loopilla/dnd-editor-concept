/*
    This utility serves to calculate a point and a segment distance
*/

(function(){
    var Utils = Utils || {};
    Utils.Math = {
        sqr: x => x * x,

        dist2: (v, w) => Utils.Math.sqr(v.x - w.x) + Utils.Math.sqr(v.y - w.y),

        distToSegmentSquared: (p, v, w) => {
            let l2 = Utils.Math.dist2(v, w);

            if (l2 == 0)
                return Utils.Math.dist2(p, v);

            let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            return Utils.Math.dist2(p, {
                x: v.x + t * (w.x - v.x),
                y: v.y + t * (w.y - v.y) }
            );
        },

        distToSegment: (p, v, w) => Math.sqrt(Utils.Math.distToSegmentSquared(p, v, w))
    };

    if (typeof window === "object" && typeof window.document === "object") {
        if(!window.Utils)
            window.Utils = Utils;
    }
})();