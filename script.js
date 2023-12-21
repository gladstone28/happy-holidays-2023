/*!
Happy Holidays 2023
Copyright (c) 2023 by Wakana Y.K. (https://codepen.io/wakana-k/pen/ExrBQKq)
*/
import * as THREE from "three";

import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

import { RGBELoader as t } from "three/addons/loaders/RGBELoader.js";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { MeshSurfaceSampler as o } from "three/addons/math/MeshSurfaceSampler.js";

import { EffectComposer as n } from "three/addons/postprocessing/EffectComposer.js";

import { RenderPass as r } from "three/addons/postprocessing/RenderPass.js";

import { ShaderPass as s } from "three/addons/postprocessing/ShaderPass.js";

import { UnrealBloomPass as a } from "three/addons/postprocessing/UnrealBloomPass.js";

import { SVGLoader as i } from "three/addons/loaders/SVGLoader.js";

import { Flow as l } from "three/addons/modifiers/CurveModifier.js";

let h = await new t().loadAsync(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr"
);

(h.mapping = THREE.EquirectangularReflectionMapping),
  (function () {
    function t(e, t, o) {
      let n,
        r = t.length,
        s = new THREE.InstancedMesh(P.geometry, P.material, r);
      se.set(0, 0, 0, 0), ae.set(1, 1, 1);
      for (let a = 0; a < r; a++) {
        if (
          (te.set(t[a][0], t[a][1], t[a][2]),
          (ne = te),
          ("ribbon" != o && "twist" != o) ||
            (le.lookAt(te.x, 0, te.z), (se = le.quaternion)),
          1 != e && ae.set(e, e, e),
          oe.compose(ne, se, ae),
          "ribbon" == o)
        )
          n = new THREE.Color("red");
        else if ("light" == o || "light2" == o)
          n = new THREE.Color("burlywood");
        else if ("sphere" == o) {
          let e = ["white", "red"];
          n = new THREE.Color(e[Math.floor(Math.random() * e.length)]);
        } else "twist" == o && (n = new THREE.Color(u(70)));
        s.setMatrixAt(a, oe), s.setColorAt(a, n);
      }
      return s;
    }
    function d(e) {
      /*! this function from https://stackoverflow.com/questions/69025167/threejs-how-can-i-add-tetrahedron-geometry-to-the-surface */
      let t = this.attributes.position;
      if (null != this.index) return;
      let o = t.count / 3,
        n = [],
        r = new THREE.Triangle(),
        s = new THREE.Vector3(),
        a = new THREE.Vector3(),
        i = new THREE.Vector3();
      for (let l = 0; l < o; l++) {
        s.fromBufferAttribute(t, 3 * l + 0),
          a.fromBufferAttribute(t, 3 * l + 1),
          i.fromBufferAttribute(t, 3 * l + 2),
          r.set(s, a, i);
        let o = new THREE.Vector3();
        r.getMidpoint(o);
        let h = s.distanceTo(a),
          d = (Math.sqrt(3) / 2) * h * e,
          c = o.clone().normalize().setLength(d);
        o.add(c),
          n.push(
            o.clone(),
            s.clone(),
            a.clone(),
            o.clone(),
            a.clone(),
            i.clone(),
            o.clone(),
            i.clone(),
            s.clone()
          );
      }
      let l = new THREE.BufferGeometry().setFromPoints(n);
      return l.computeVertexNormals(), l;
    }
    function c(e) {
      for (let t = e.length; 1 < t; t--) {
        let o = Math.floor(Math.random() * t);
        [e[o], e[t - 1]] = [e[t - 1], e[o]];
      }
      return e;
    }
    function u(e) {
      let t = [
        "hsl(0, 100%, " + e + "%)",
        "hsl(10, 100%, " + e + "%)",
        "hsl(20, 100%, " + e + "%)",
        "hsl(30, 100%, " + e + "%)",
        "hsl(40, 100%, " + e + "%)",
        "hsl(50, 100%, " + e + "%)",
        "hsl(60, 100%, " + e + "%)",
        "hsl(70, 100%, " + e + "%)",
        "hsl(80, 100%, " + e + "%)",
        "hsl(150, 100%, " + e + "%)",
        "hsl(160, 100%, " + e + "%)",
        "hsl(170, 100%, " + e + "%)",
        "hsl(180, 100%, " + e + "%)",
        "hsl(190, 100%, " + e + "%)",
        "hsl(200, 100%, " + e + "%)",
        "hsl(270, 100%, " + e + "%)",
        "hsl(280, 100%, " + e + "%)",
        "hsl(290, 100%, " + e + "%)",
        "hsl(300, 100%, " + e + "%)",
        "hsl(310, 100%, " + e + "%)",
        "hsl(320, 100%, " + e + "%)",
        "hsl(330, 100%, " + e + "%)",
        "hsl(340, 100%, " + e + "%)",
        "hsl(350, 100%, " + e + "%)"
      ];
      return (t = c(t))[Math.floor(Math.random() * t.length)];
    }
    function E() {
      const e = window.innerWidth,
        t = window.innerHeight;
      (w.aspect = e / t),
        w.updateProjectionMatrix(),
        R.setSize(e, t),
        L.setSize(e, t),
        N.setSize(e, t),
        f();
    }
    function p(e) {
      (e.isMesh || e.isInstancedMesh) &&
        !1 === W.test(e.layers) &&
        ((Q[e.uuid] = e.material), (e.material = _));
    }
    function m(e) {
      Q[e.uuid] && ((e.material = Q[e.uuid]), delete Q[e.uuid]);
    }
    function M() {
      requestAnimationFrame(M), H.update(), $ && $.moveAlongCurve(5e-4), f();
    }
    function f() {
      K.getElapsedTime() > J / 1e3 &&
        (G.layers.toggle(X), U.layers.toggle(X), K.stop(), K.start()),
        V &&
          (function (e) {
            for (let t = 0; t < e.count; t++)
              e.getMatrixAt(t, oe),
                oe.decompose(D.position, D.quaternion, D.scale),
                (D.position.y -= Z * ((t % 4) + 1)),
                D.position.y < -j
                  ? ((D.position.y = j),
                    (D.position.x = THREE.MathUtils.randFloat(-j, j)),
                    (D.position.z = THREE.MathUtils.randFloat(-j, j)))
                  : t % 4 == 1
                  ? ((D.position.x += Y), (D.position.z += q))
                  : t % 4 == 2
                  ? ((D.position.x += Y), (D.position.z -= q))
                  : t % 4 == 3
                  ? ((D.position.x -= Y), (D.position.z += q))
                  : ((D.position.x -= Y), (D.position.z -= q)),
                (D.rotation.x += THREE.MathUtils.randFloat(0, F)),
                (D.rotation.z += THREE.MathUtils.randFloat(0, k)),
                D.updateMatrix(),
                e.setMatrixAt(t, D.matrix);
            e.instanceMatrix.needsUpdate = !0;
          })(V),
        T.traverse(p),
        L.render(),
        T.traverse(m),
        N.render();
    }
    let w,
      T,
      R,
      H,
      g,
      b,
      y,
      x,
      P,
      B,
      I,
      S,
      v,
      G,
      U,
      V,
      C,
      z = 1,
      A = [],
      j = 12;
    const F = Math.PI / 30,
      k = Math.PI / 50,
      Z = 0.007,
      Y = 0.005,
      q = 0.005,
      D = new THREE.Object3D();
    let L, N;
    const X = 1,
      W = new THREE.Layers();
    W.set(X);
    const O = {
        exposure: 0,
        bloomStrength: 1,
        bloomThreshold: 0,
        bloomRadius: 0.1
      },
      _ = new THREE.MeshBasicMaterial({
        color: "black"
      }),
      Q = {},
      J = 1e3,
      K = new THREE.Clock();
    let $, ee;
    const te = new THREE.Vector3(),
      oe = new THREE.Matrix4();
    let ne = new THREE.Vector3(),
      re = new THREE.Euler(),
      se = new THREE.Quaternion();
    const ae = new THREE.Vector3(1, 1, 1),
      ie = new THREE.Vector3(0, 0, 0),
      le = new THREE.Object3D();
    !(function () {
      const u = document.createElement("div");
      document.body.appendChild(u),
        ((T = new THREE.Scene()).background = "black"),
        (T.environment = h),
        (R = new THREE.WebGLRenderer({
          antialias: !0
        })).setPixelRatio(window.devicePixelRatio),
        R.setSize(window.innerWidth, window.innerHeight),
        (R.toneMapping = THREE.ReinhardToneMapping),
        u.appendChild(R.domElement),
        (w = new THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          0.01,
          500
        )).position.set(0, 0.8, 25),
        w.lookAt(0, 0, 0);
      const p = new r(T, w),
        m = new a(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          O.bloomStrength,
          O.bloomRadius,
          O.bloomThreshold
        );
      ((L = new n(R)).renderToScreen = !1), L.addPass(p), L.addPass(m);
      const f = new s(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: {
              value: null
            },
            bloomTexture: {
              value: L.renderTarget2.texture
            }
          },
          vertexShader: document.getElementById("vertexshader").textContent,
          fragmentShader: document.getElementById("fragmentshader").textContent,
          defines: {}
        }),
        "baseTexture"
      );
      (f.needsSwap = !0),
        (N = new n(R)).addPass(p),
        N.addPass(f),
        (x = new THREE.MeshBasicMaterial({
          color: "white",
          reflectivity: 0.8,
          envMap: h
        })),
        (ee = (function () {
          let e,
            t = new THREE.Vector3();
          (A = []), (g = new THREE.PlaneGeometry(0.05, 0.05));
          for (let o = 0; o < 500; o++) {
            const o = Math.acos(THREE.MathUtils.randFloatSpread(2)),
              n = THREE.MathUtils.randFloatSpread(360);
            (t.x = 2 * Math.sin(o) * Math.cos(n)),
              (t.y = 10 * Math.abs(2 * Math.sin(o) * Math.sin(n)) - 20),
              (t.z = 2 * Math.cos(o)),
              (e = Math.random()),
              t.copy(t).multiplyScalar(e);
            let r = g.clone();
            r.rotateX(Math.random() * Math.PI),
              r.rotateY(Math.random() * Math.PI),
              r.rotateZ(Math.random() * Math.PI),
              r.translate(t.x, t.y, t.z),
              A.push(r);
          }
          return (
            (g = BufferGeometryUtils.mergeGeometries(A)).rotateZ(-Math.PI / 2),
            (g.attributes.position.needsUpdate = !0),
            g.center(),
            g.computeBoundingBox(),
            g.computeVertexNormals(),
            (b = x.clone()).color.set("khaki"),
            (b.side = THREE.DoubleSide),
            (y = new THREE.Mesh(g, b))
          );
        })());
      let F = (function (e = 1, t = 1, o = 100, n) {
        const r = [];
        let s, a, i, l;
        for (let h = 0; h <= o; h++)
          (a = (s = e * h) * Math.cos(h)),
            (l = s * Math.sin(h)),
            (i = t * -h + n),
            r.push(new THREE.Vector3(a, i, l));
        r.push(new THREE.Vector3(0, i, 0));
        for (let h = o; h >= 0; h--)
          (a = (s = e * h) * Math.cos(-h)),
            (l = s * Math.sin(-h)),
            (i = t * -h + n),
            r.push(new THREE.Vector3(a, i, l));
        return (
          r.push(new THREE.Vector3(0, i, 0)),
          new THREE.CatmullRomCurve3(r, !0, "centripetal", 0)
        );
      })(0.24, 0.2 * 3, 30, 10);
      F.getPoints(30),
        new THREE.Mesh(g, b),
        ($ = new l(ee)).updateCurve(0, F),
        T.add($.object3D),
        (function () {
          const e = document.querySelector("svg#snowflake").outerHTML,
            t = new i().parse(e).paths[0],
            o = i.createShapes(t)[0];
          let n = new THREE.ExtrudeGeometry(o, {
            steps: 1,
            depth: 15,
            bevelEnabled: !0,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: -3,
            bevelSegments: 0
          });
          n.scale(0.002, 0.002, 0.002),
            (n = BufferGeometryUtils.mergeVertices(n, 1e-4)).center(),
            (n.attributes.position.needsUpdate = !0),
            n.computeBoundingBox(),
            n.computeVertexNormals(),
            (b = x.clone()).color.set("white"),
            (b.reflectivity = 0.8),
            (V = new THREE.InstancedMesh(n, b, 128)),
            se.set(0, 0, 0, 0),
            ae.set(1, 1, 1);
          for (let e = 0; e < 128; e++)
            te.set(
              THREE.MathUtils.randFloat(-j, j),
              THREE.MathUtils.randFloat(-j, j),
              THREE.MathUtils.randFloat(-j, j)
            ),
              (ne = te),
              re.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ),
              se.setFromEuler(re),
              (ae.x = ae.y = ae.z = 0.5 * Math.random() + 0.5),
              oe.compose(ne, se, ae),
              V.setMatrixAt(e, oe);
          T.add(V);
        })(),
        (g = (function (e, t, o) {
          let n = [];
          for (let r = 0; r < 2 * e; r++) {
            let s, a;
            n.push(0, 0, -o / 2),
              r % 2 == 0 ? ((s = t), (a = 1)) : ((s = 1), (a = t));
            let i = ((r + 1) / e) * Math.PI;
            n.push(Math.cos(i) * s, Math.sin(i) * s, 0),
              (i = (r / e) * Math.PI),
              n.push(Math.cos(i) * a, Math.sin(i) * a, 0),
              n.push(0, 0, o / 2),
              (i = (r / e) * Math.PI),
              n.push(Math.cos(i) * a, Math.sin(i) * a, 0),
              (i = ((r + 1) / e) * Math.PI),
              n.push(Math.cos(i) * s, Math.sin(i) * s, 0);
          }
          return (
            (n = new Float32Array(n)),
            (g = new THREE.BufferGeometry()).setAttribute(
              "position",
              new THREE.BufferAttribute(n, 3)
            ),
            g.rotateZ(-Math.PI / e / 2),
            (g.attributes.position.needsUpdate = !0),
            g.computeVertexNormals(),
            g.center(),
            g
          );
        })(5, 2, 1.78)),
        (b = x.clone()).color.set("yellow"),
        (b.reflectivity = 1);
      const k = new THREE.Mesh(g, b);
      let Z;
      (k.position.y = 5.7), (z = 0.35), k.scale.set(z, z, z), T.add(k);
      let Y = [],
        q = [];
      (g = new THREE.CylinderGeometry(0.1, 4.5, 10, 8, 1, !0)),
        (y = new THREE.Mesh(g, new THREE.MeshBasicMaterial())),
        (Z = new o(y).build()),
        (C = 0.1),
        (z = 3),
        (THREE.BufferGeometry.prototype.tripleFace = d);
      let D = new THREE.IcosahedronGeometry(C, 0).tripleFace(z);
      A = [];
      for (let e = 0; e < 2e3; e++)
        Z.sample(te, ie),
          (g = D.clone()).rotateX(Math.random() * Math.PI),
          g.rotateY(Math.random() * Math.PI),
          g.rotateZ(Math.random() * Math.PI),
          g.translate(te.x, te.y, te.z),
          A.push(g);
      (g = BufferGeometryUtils.mergeGeometries(A)).computeVertexNormals(),
        (b = x.clone()).color.set("#5f8f00"),
        (b.reflectivity = 0.8),
        (B = new THREE.Mesh(g, b)),
        T.add(B),
        (g = new THREE.CylinderGeometry(0.6, 5, 10, 8, 1, !0)),
        (Y = []),
        (q = []),
        (y = new THREE.Mesh(g, new THREE.MeshBasicMaterial())),
        (Z = new o(y).build());
      for (let e = 0; e < 2282; e++)
        Z.sample(te, ie), Y.push([te.x, te.y, te.z]);
      Y = c(Y);
      let W = [];
      for (let e = 0; e < 70; e++) {
        let e = Math.floor(Math.random() * Y.length);
        W.push(Y.splice(e, 1)[0]);
      }
      let _ = [];
      for (let e = 0; e < 70; e++) {
        let e = Math.floor(Math.random() * Y.length);
        _.push(Y.splice(e, 1)[0]);
      }
      let Q = [];
      for (let e = 0; e < 22; e++) {
        let e = Math.floor(Math.random() * Y.length);
        Q.push(Y.splice(e, 1)[0]);
      }
      let J = [];
      for (let e = 0; e < 0; e++) {
        let e = Math.floor(Math.random() * Y.length);
        J.push(Y.splice(e, 1)[0]);
      }
      let K = [];
      for (let e = 0; e < 120; e++) {
        let e = Math.floor(Math.random() * Y.length);
        K.push(Y.splice(e, 1)[0]);
      }
      (C = 0.24),
        (z = 1),
        (g = new THREE.SphereGeometry(C, 20, 20)),
        (b = x.clone()),
        (P = new THREE.Mesh(g, b)),
        (I = t(z, K, "sphere")),
        T.add(I),
        (z = 1),
        (g = (function (e) {
          let t = 1.5 * e,
            o = new THREE.SphereGeometry(e, 10, 10);
          const n = o.attributes.position;
          for (let r = 0; r < n.count; r++)
            n.getY(r) > e / 3 &&
              (o.attributes.position.setX(r, 0),
              o.attributes.position.setY(r, t),
              o.attributes.position.setZ(r, 0));
          (A = []), o.translate(0, -t, 0);
          let r = o.clone();
          return (
            r.rotateZ(Math.PI / 2),
            A.push(r),
            (r = o.clone()).rotateZ(-Math.PI / 2),
            A.push(r),
            (r = o.clone()).scale(0.7, 1.5, 0.7),
            r.rotateZ(Math.PI / 8),
            A.push(r),
            (r = o.clone()).scale(0.7, 1.5, 0.7),
            r.rotateZ(-Math.PI / 8),
            A.push(r),
            (r = new THREE.SphereGeometry(t / 2.3, 5, 5)),
            A.push(r),
            (o = BufferGeometryUtils.mergeGeometries(A)),
            (o = BufferGeometryUtils.mergeVertices(o, e / 10)).scale(1, 1, 0.7),
            o.rotateX(-Math.PI / 7),
            (o.attributes.position.needsUpdate = !0),
            o.computeBoundingBox(),
            o.computeVertexNormals(),
            o
          );
        })((C = 0.15))),
        ((b = x.clone()).reflectivity = 0.4),
        (P = new THREE.Mesh(g, b)),
        (v = t(z, Q, "ribbon")),
        T.add(v),
        (z = 1),
        (g = (function (e) {
          let t = 1.3 * e,
            o = new THREE.SphereGeometry(e, 10, 10);
          const n = o.attributes.position;
          for (let r = 0; r < n.count; r++)
            n.getY(r) > e / 1.2 &&
              (o.attributes.position.setX(r, 0),
              o.attributes.position.setY(r, t),
              o.attributes.position.setZ(r, 0));
          (A = []), o.scale(0.5, 1.5, 1);
          let r = o.clone();
          return (
            A.push(r),
            (r = o.clone()).rotateY((Math.PI / 4) * 1),
            A.push(r),
            (r = o.clone()).rotateY((Math.PI / 4) * 2),
            A.push(r),
            (r = o.clone()).rotateY((Math.PI / 4) * 3),
            A.push(r),
            (o = BufferGeometryUtils.mergeGeometries(A)),
            (o = BufferGeometryUtils.mergeVertices(o, e / 10)).rotateX(
              -Math.PI / 7
            ),
            o.scale(1.5, 1.5, 1.5),
            (o.attributes.position.needsUpdate = !0),
            o.computeBoundingBox(),
            o.computeVertexNormals(),
            o
          );
        })((C = 0.13))),
        (b = x.clone()),
        (P = new THREE.Mesh(g, b)),
        (S = t(z, J, "twist")),
        T.add(S),
        (C = 0.11),
        (z = 1),
        (g = new THREE.SphereGeometry(C, 10, 10)),
        (P = new THREE.Mesh(g, new THREE.MeshBasicMaterial())),
        (G = t(z, W, "light")),
        T.add(G),
        (U = t(z, _, "light2")).layers.toggle(X),
        T.add(U),
        ((H = new e(w, R.domElement)).autoRotate = !0),
        (H.autoRotateSpeed = 1),
        (H.enableDamping = !0),
        (H.enablePan = !1),
        (H.minDistance = 8),
        (H.maxDistance = 30),
        (H.minPolarAngle = 0),
        (H.maxPolarAngle = Math.PI / 2),
        H.target.set(0, 0, 0),
        H.update(),
        M(),
        window.addEventListener("resize", E);
    })();
  })();