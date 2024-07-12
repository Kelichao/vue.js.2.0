<template>
  <div>
    <div class="operation-diagram" style="background:gray">
      <canvas ref="canvas" id="myCanvas" width="1319" height="314">Your browsing is not compatible with
        this.canvas</canvas>
    </div>
  </div>
</template>

<script>
var M = 37
var  N = 37
var  A = 817
var  h = 817
var  H = 817
var  O = 817
var  j = 37
var  W = 37
var  q = 37
var  B = 37
var  k = 53
var  G = 53

export default {
  name: "",
  components: {},
  props: {
    siteId: String
  },
  data: () => ({
    canvas: null,
    ctx: null,
    info: {},
    time: null,
    ratio: 1
  }),
  watch: {
    siteId: {
      handler(e) {
        e && this.getInfo(e), console.log(e);
      },
      immediate: !0
    }
  },
  destroyed() {
    clearTimeout(this.time), (this.time = null), this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ), console.log(
      "destroyed...",
      this.ctx
    ), (this.canvas = null), (this.info = {}), (this.ctx = null), (M = 37), (N = 37), (A = 817), (h = 817), (H = 817), (O = 817), (j = 37), (W = 37), (q = 37), (B = 37), (k = 53), (G = 53);
  },
  mounted() {
    (this.canvas = document.getElementById(
      "myCanvas"
    )), (this.ctx = this.canvas.getContext("2d"));
    var e = this.$refs.canvas.offsetWidth;
    (this.canvas.width = e), (this.ratio = 866 / e), (A =
      817 / this.ratio), (h = 817 / this.ratio), (H = 817 / this.ratio), (O =
        817 / this.ratio);

    this.getInfo()
  },
  methods: {
    async getInfo(e) {
      // e = (await Object(b.Ab)({
      //   siteId: e
      // })).data;
      e = {}
      var {
        pvCacp: a,
        countOfInveter: t,
        powerOfPV: m,
        elecOfPVInveter: n,
        elecOfPVMeter: o,
        elecOfPVOnGrid: s,
        elecOfPVOffGrid: S,
        powerOfEs: r,
        esCacp: i,
        soc: x,
        energyOfEsCharge: L,
        energyOfEsRelease: l,
        loadElec: p
      } = e;
      (this.info = {
        ...e,
        pvCacp: Number(Number(a).toFixed(2)) || "0",
        countOfInveter: Number(Number(t).toFixed(2)) || "0",
        powerOfPV: Number((Number(m) / 1e3).toFixed(2)) || "2",
        powerOfEs: Number((Number(r) / 1e3).toFixed(2)) || "0",
        elecOfPVInveter: Number(Number(n).toFixed(2)) || "0",
        elecOfPVMeter: Number(Number(o).toFixed(2)) || "0",
        elecOfPVOnGrid: Number(Number(s).toFixed(2)) || "0",
        elecOfPVOffGrid: Number(Number(S).toFixed(2)) || "0",
        esCacp: Number(Number(i).toFixed(2)) || "0",
        soc: Number(Number(x).toFixed(2)) || "0",
        energyOfEsCharge: Number(Number(L).toFixed(2)) || "0",
        energyOfEsRelease: Number(Number(l).toFixed(2)) || "0",
        loadElec: Number(Number(p).toFixed(2)) || "0"
      }), this.setTimeoutFunc();
    },
    setTimeoutFunc() {
      this.time = setTimeout(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var e,
          {
            projectType: a,
            powerOfPV: t,
            countOfGateMeter: m,
            onGridType: n,
            gridReal: o,
            powerOfEs: s
          } = this.info;
        switch (a) {
          case "01":
            "02" === n &&
              0.2 < Number(t) &&
              (
                N <= 817 / this.ratio && N++,
                M <= 817 / this.ratio &&
                (70 <= N - M || N >= 817 / this.ratio) &&
                M++,
                N >= 817 / this.ratio
              ) &&
              M >= 817 / this.ratio &&
              ((N = 37), (M = 37)), "03" === n &&
              (
                0.2 < Number(t) &&
                (
                  (e = 683 / this.ratio + 157),
                  W <= e && W++,
                  j <= e && (70 <= W - j || W >= e) && j++,
                  W >= e
                ) &&
                j >= e &&
                ((W = 37), (j = 37)),
                0 < Number(m)
              ) &&
              (
                0 < Number(o) &&
                (
                  N <= 817 / this.ratio && N++,
                  M <= 817 / this.ratio &&
                  (70 <= N - M || N >= 817 / this.ratio) &&
                  M++,
                  N >= 817 / this.ratio
                ) &&
                M >= 817 / this.ratio &&
                ((N = 37), (M = 37)),
                Number(o) < 0
              ) &&
              (
                (e = 576 / this.ratio * 2 - 137 - 703 / this.ratio),
                h >= e && h--,
                A >= e && (70 <= A - h || h <= e) && A--,
                h <= e
              ) &&
              A <= e &&
              ((h = 817 / this.ratio), (A = 817 / this.ratio));
            break;
          case "02":
            2 < Number(s) &&
              (
                (e = 683 / this.ratio + 157),
                W <= e && W++,
                j <= e && (70 <= W - j || W >= e) && j++,
                W >= e
              ) &&
              j >= e &&
              ((W = 37), (j = 37)), Number(s) < -2 &&
              (
                58 <= O && O--,
                58 <= H && (70 <= H - O || O <= 58) && H--,
                O <= 58
              ) &&
              H <= 58 &&
              ((O = 817 / this.ratio), (H = 817 / this.ratio)), (2 <
                Number(s) ||
                Number(s) < -2) &&
              (
                (e = 576 / this.ratio * 2 - 137 - 703 / this.ratio),
                h >= e && h--,
                A >= e && (70 <= A - h || h <= e) && A--,
                h <= e
              ) &&
              A <= e &&
              ((h = 817 / this.ratio), (A = 817 / this.ratio));
            break;
          default:
            0.2 < Number(t) &&
              (
                (e = 683 / this.ratio + 157),
                W <= e && W++,
                j <= e && (70 <= W - j || W >= e) && j++,
                W >= e
              ) &&
              j >= e &&
              ((W = 37), (j = 37)), 0 < Number(m) &&
              (
                0 < Number(o) &&
                (
                  N <= 817 / this.ratio && N++,
                  M <= 817 / this.ratio &&
                  (70 <= N - M || N >= 817 / this.ratio) &&
                  M++,
                  N >= 817 / this.ratio
                ) &&
                M >= 817 / this.ratio &&
                ((N = 37), (M = 37)),
                Number(o) < 0
              ) &&
              (
                (e = 576 / this.ratio * 2 - 137 - 703 / this.ratio),
                h >= e && h--,
                A >= e && (70 <= A - h || h <= e) && A--,
                h <= e
              ) &&
              A <= e &&
              ((h = 817 / this.ratio), (A = 817 / this.ratio)), 2 <
              Number(s) &&
              (
                (e = 560 / this.ratio + 140),
                q <= e && q++,
                B <= e && (70 <= q - B || q >= e) && B++,
                q >= e
              ) &&
              B >= e &&
              ((q = 37), (B = 37)), Number(s) < -2 &&
              (
                (e = 123 + 560 / this.ratio),
                k <= e && k++,
                G <= e && (70 <= k - G || k >= e) && G++,
                k >= e
              ) &&
              G >= e &&
              ((k = 53), (G = 53));
        }
        "{}" !== JSON.stringify(this.info) && this.initDraw(), clearTimeout(
          this.time
        ), this.time && this.setTimeoutFunc();
      }, 1);
    },
    initDraw() {
      var {
        projectType: e,
        pvCacp: a,
        onGridType: t,
        countOfInveter: m,
        powerOfPV: n,
        elecOfPVInveter: o,
        elecOfPVMeter: s,
        countOfGridMeter: S,
        countOfGateMeter: r,
        elecOfPVOnGrid: b,
        elecOfPVOffGrid: i,
        gridReal: x,
        loadElec: L,
        soc: l,
        esCacp: p,
        countOfPcs: c,
        countOfEsMeter: f,
        powerOfEs: d,
        energyOfEsCharge: T,
        energyOfEsRelease: u
      } = this.info;
      switch (((this.canvas.height = 314), this.dashedStroke(), e)) {
        case "01":
          ("02" !== t && t) ||
            (
              (this.canvas.height = 150),
              this.dashedStroke()
            ), this.BMSToLoadDraw(), this.powerToLoadLineDraw(), this.lineTranslateDraw(), this.circleDraw(
              70,
              53,
              "1"
            ), this.circleDraw(201 / this.ratio, 53, "2"), this.textDraw(
              "default.text.elecPower",
              279 / this.ratio,
              43,
              !1
            ), this.textDraw(o + "kWh", 279 / this.ratio, 73, !1), Number(S) &&
            (
              this.circleDraw(357 / this.ratio, 53, "3"),
              this.textDraw(
                "pvcp.param.gridConnectedTable",
                357 / this.ratio,
                104,
                !0
              ),
              this.textDraw(
                "default.text.elecPower",
                468.5 / this.ratio,
                43,
                !1
              ),
              this.textDraw(s + "kWh", 468.5 / this.ratio, 73, !1)
            ), this.circleDraw(817 / this.ratio, 53, "5"), "03" === t &&
            (
              this.dashedFH(),
              this.circleDraw(703 / this.ratio, 190, "9"),
              this.textDraw(
                "pvcp.label.load",
                703 / this.ratio,
                241,
                !0
              ),
              Number(r)
            ) &&
            (
              this.circleDraw(703 / this.ratio, 53, "4"),
              this.textDraw(
                "pvcp.text.internetWatch",
                703 / this.ratio,
                104,
                !0
              ),
              this.textDraw(
                "pvcp.text.photovoltaicElectricityConsumption",
                633 / this.ratio,
                180,
                !1
              ),
              this.textDraw(L + "kWh", 633 / this.ratio, 210, !1),
              this.textDraw(
                "pvcp.label.onGridElectricity",
                633 / this.ratio,
                23,
                !1
              ),
              this.textDraw(b + "kWh", 633 / this.ratio, 43, !1),
              this.textDraw(
                "pvcp.field.off-ridEnergy",
                633 / this.ratio,
                78,
                !1
              ),
              this.textDraw(i + "kWh", 633 / this.ratio, 98, !1)
            ), this.textDraw(
              "pvcp.param.PVModule",
              70,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.capacity" + `：${a}kWp`,
              70,
              124,
              !1
            ), this.textDraw(
              "pvcp.label.invertor" + `(${m})`,
              201 / this.ratio,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.activePower" + `：${n}kW`,
              201 / this.ratio,
              124,
              !1
            ), this.textDraw(
              "pvcp.label.powerGrid",
              817 / this.ratio,
              104,
              !0
            );
          break;
        case "02":
          this.dashedFH(), 2 < Number(d) && this.BMSToLoadDraw(), Number(d) <
            -2 && this.powerToBMSDraw(), (2 < Number(d) || Number(d) < -2) &&
            this.powerToLoadLineDraw(), Number(f) &&
            (
              this.circleDraw(357 / this.ratio, 53, "8"),
              this.textDraw(
                "pvcp.text.energyStorageMeter",
                357 / this.ratio,
                104,
                !0
              ),
              this.textDraw(
                "default.text.chargePower",
                465 / this.ratio,
                33,
                !1
              ),
              this.textDraw(T + "kWh", 465 / this.ratio, 48, !1),
              this.textDraw(
                "default.text.dischargePower",
                465 / this.ratio,
                68,
                !1
              ),
              this.textDraw(u + "kWh", 465 / this.ratio, 83, !1)
            ), this.circleDraw(817 / this.ratio, 53, "5"), this.textDraw(
              "pvcp.label.powerGrid",
              817 / this.ratio,
              104,
              !0
            ), this.circleDraw(70, 53, "6"), this.circleDraw(
              201 / this.ratio,
              53,
              "7"
            ), this.circleDraw(703 / this.ratio, 190, "9"), this.textDraw(
              "BMS",
              70,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.capacity" + `：${p}kWh`,
              70,
              124,
              !1
            ), this.textDraw(`SOC：${l}%`, 70, 144, !1), this.textDraw(
              `PCS(${c})`,
              201 / this.ratio,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.energyStoragePower" + `：${d}kW`,
              201 / this.ratio,
              124,
              !1
            ), this.textDraw(
              "pvcp.label.load",
              703 / this.ratio,
              241,
              !0
            );
          break;
        default:
          this.dashedBMS(), this.dashedFH(), this.lineTranslateDraw(), this.BMSToLoadDraw(), this.powerToLoadLineDraw(), this.BMSToNodeDraw(), this.NodeToBMSDraw(), this.circleDraw(
            70,
            53,
            "1"
          ), this.circleDraw(201 / this.ratio, 53, "2"), this.textDraw(
            "default.text.elecPower",
            279 / this.ratio,
            43,
            !1
          ), this.textDraw(o + "kWh", 279 / this.ratio, 573, !1), Number(S) &&
            (
              this.circleDraw(357 / this.ratio, 53, "3"),
              this.textDraw(
                "pvcp.param.gridConnectedTable",
                357 / this.ratio,
                104,
                !0
              ),
              this.textDraw(
                "default.text.elecPower",
                468.5 / this.ratio,
                43,
                !1
              ),
              this.textDraw(s + "kWh", 468.5 / this.ratio, 73, !1)
            ), Number(r) &&
            (
              this.circleDraw(703 / this.ratio, 53, "4"),
              this.textDraw(
                "pvcp.text.internetWatch",
                703 / this.ratio,
                104,
                !0
              ),
              this.textDraw(
                "pvcp.text.photovoltaicElectricityConsumption",
                633 / this.ratio,
                180,
                !1
              ),
              this.textDraw(L + "kWh", 633 / this.ratio, 210, !1),
              0 < Number(x) &&
              (
                this.textDraw(
                  "pvcp.label.onGridElectricity",
                  633 / this.ratio,
                  43,
                  !1
                ),
                this.textDraw(b + "kWh", 633 / this.ratio, 73, !1)
              ),
              Number(x) < 0
            ) &&
            (
              this.textDraw(
                "pvcp.field.off-ridEnergy",
                633 / this.ratio,
                43,
                !1
              ),
              this.textDraw(i + "kWh", 633 / this.ratio, 73, !1)
            ), this.circleDraw(817 / this.ratio, 53, "5"), this.circleDraw(
              70,
              193,
              "6"
            ), this.circleDraw(201 / this.ratio, 193, "7"), Number(f) &&
            (
              this.circleDraw(357 / this.ratio, 193, "8"),
              this.textDraw(
                "pvcp.text.energyStorageMeter",
                357 / this.ratio,
                244,
                !0
              ),
              this.textDraw(
                "default.text.chargePower",
                465 / this.ratio,
                163,
                !1
              ),
              this.textDraw(T + "kWh", 465 / this.ratio, 183, !1),
              this.textDraw(
                "default.text.dischargePower",
                465 / this.ratio,
                213,
                !1
              ),
              this.textDraw(u + "kWh", 465 / this.ratio, 233, !1)
            ), this.circleDraw(703 / this.ratio, 190, "9"), this.textDraw(
              "pvcp.param.PVModule",
              70,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.capacity" + `：${a}kWp`,
              70,
              124,
              !1
            ), this.textDraw(
              "pvcp.label.invertor" + `(${m})`,
              201 / this.ratio,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.activePower" + `：${n}kW`,
              201 / this.ratio,
              124,
              !1
            ), this.textDraw(
              "pvcp.label.powerGrid",
              817 / this.ratio,
              104,
              !0
            ), this.textDraw(
              "pvcp.label.load",
              703 / this.ratio,
              241,
              !0
            ), this.textDraw("BMS", 70, 244, !0), this.textDraw(
              "pvcp.label.capacity" + `：${p}kWh`,
              70,
              259,
              !1
            ), this.textDraw(`SOC:${l}%`, 70, 274, !1), this.textDraw(
              `PCS(${c})`,
              201 / this.ratio,
              244,
              !0
            ), this.textDraw(
              "pvcp.label.energyStoragePower" + `：${d}kW`,
              201 / this.ratio,
              259,
              !1
            );
      }
    },
    dashedStroke() {
      this.ctx.beginPath(), this.ctx.setLineDash([4, 2]), this.ctx.moveTo(
        37,
        53
      ), this.ctx.lineTo(830 / this.ratio, 53), (this.ctx.strokeStyle =
        "#c0c7d4"), this.ctx.stroke();
    },
    dashedBMS() {
      this.ctx.beginPath(), this.ctx.setLineDash([4, 2]), this.ctx.moveTo(
        37,
        193
      ), this.ctx.lineTo(560 / this.ratio, 193), this.ctx.lineTo(
        560 / this.ratio,
        53
      ), (this.ctx.strokeStyle = "#c0c7d4"), this.ctx.stroke();
    },
    dashedFH() {
      this.ctx.beginPath(), this.ctx.setLineDash([4, 2]), this.ctx.moveTo(
        576 / this.ratio,
        53
      ), this.ctx.lineTo(576 / this.ratio, 190), this.ctx.lineTo(
        703 / this.ratio,
        190
      ), (this.ctx.strokeStyle = "#c0c7d4"), this.ctx.stroke();
    },
    circleDraw(e, a, m) {
      var n,
        {
          projectType: o,
          onGridType: s,
          powerOfPV: S,
          countOfGateMeter: r,
          gridReal: b,
          soc: i,
          powerOfEs: x
        } = this.info;
      this.ctx.beginPath(), (this.ctx.lineCap =
        "none"), (this.ctx.shadowBlur = 0), (this.ctx.shadowOffsetY = 0), (this.ctx.lineWidth = 1), this.ctx.setLineDash(
          [4, 2]
        ), this.ctx.arc(
          e,
          a,
          33,
          0,
          360,
          !1
        ), (this.ctx.fillStyle = this.themeChange() ? "#fff" : "#282F39");
      let L = "#c0c7d4";
      switch (o) {
        case "01":
          "02" === s &&
            (
              "1" === m &&
              0.2 < Number(S) &&
              (N <= 103 || M <= 103) &&
              (L = "#FFD230"),
              "2" === m &&
              0.2 < Number(S) &&
              ((N >= 201 / this.ratio - 33 && N <= 201 / this.ratio + 33) ||
                (M >= 201 / this.ratio - 33 &&
                  M <= 201 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "3" === m &&
              ((N >= 357 / this.ratio - 33 && N <= 357 / this.ratio + 33) ||
                (M >= 357 / this.ratio - 33 &&
                  M <= 357 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "5" === m
            ) &&
            (N >= 784 / this.ratio || M >= 784 / this.ratio) &&
            (L = "#FFD230"), "03" === s &&
            (
              0.2 < Number(S) &&
              (
                "1" === m && (W <= 103 || j <= 103) && (L = "#FFD230"),
                "2" === m &&
                ((W >= 201 / this.ratio - 33 &&
                  W <= 201 / this.ratio + 33) ||
                  (j >= 201 / this.ratio - 33 &&
                    j <= 201 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "3" === m &&
                ((W >= 357 / this.ratio - 33 &&
                  W <= 357 / this.ratio + 33) ||
                  (j >= 357 / this.ratio - 33 &&
                    j <= 357 / this.ratio + 33)) &&
                (L = "#FFD230"),
                (n = 683 / this.ratio + 157 - 33),
                "9" === m
              ) &&
              (j >= n || W >= n) &&
              (L = "#FFD230"),
              0 < Number(r)
            ) &&
            (
              0 < Number(b) &&
              (
                "1" === m && (N <= 103 || M <= 103) && (L = "#FFD230"),
                "2" === m &&
                ((N >= 201 / this.ratio - 33 &&
                  N <= 201 / this.ratio + 33) ||
                  (M >= 201 / this.ratio - 33 &&
                    M <= 201 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "3" === m &&
                ((N >= 357 / this.ratio - 33 &&
                  N <= 357 / this.ratio + 33) ||
                  (M >= 357 / this.ratio - 33 &&
                    M <= 357 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "4" === m &&
                ((N >= 703 / this.ratio - 33 &&
                  N <= 703 / this.ratio + 33) ||
                  (M >= 703 / this.ratio - 33 &&
                    M <= 703 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "5" === m
              ) &&
              (N >= 784 / this.ratio || M >= 784 / this.ratio) &&
              (L = "#FFD230"),
              Number(b) < 0
            ) &&
            (
              "5" === m &&
              (h >= 784 / this.ratio || A >= 784 / this.ratio) &&
              (L = "#FFD230"),
              "4" === m &&
              ((h >= 703 / this.ratio - 33 && h <= 703 / this.ratio + 33) ||
                (A >= 703 / this.ratio - 33 &&
                  A <= 703 / this.ratio + 33)) &&
              (L = "#FFD230"),
              (n = 576 / this.ratio * 2 - 137 - 703 / this.ratio + 33),
              "9" === m
            ) &&
            (h <= n || A <= n) &&
            (L = "#FFD230");
          break;
        case "02":
          2 < Number(x) &&
            (
              "6" === m && (W <= 103 || j <= 103) && (L = "#FFD230"),
              "7" === m &&
              ((W >= 201 / this.ratio - 33 && W <= 201 / this.ratio + 33) ||
                (j >= 201 / this.ratio - 33 &&
                  j <= 201 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "8" === m &&
              ((W >= 357 / this.ratio - 33 && W <= 357 / this.ratio + 33) ||
                (j >= 357 / this.ratio - 33 &&
                  j <= 357 / this.ratio + 33)) &&
              (L = "#FFD230"),
              (n = 683 / this.ratio + 157 - 33),
              "9" === m
            ) &&
            (j >= n || W >= n) &&
            (L = "#FFD230"), Number(x) < -2 &&
            (
              "6" === m && (O <= 103 || H <= 103) && (L = "#FFD230"),
              "7" === m &&
              ((O >= 201 / this.ratio - 33 && O <= 201 / this.ratio + 33) ||
                (H >= 201 / this.ratio - 33 &&
                  H <= 201 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "8" === m &&
              ((O >= 357 / this.ratio - 33 && O <= 357 / this.ratio + 33) ||
                (H >= 357 / this.ratio - 33 &&
                  H <= 357 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "5" === m
            ) &&
            (O >= 784 / this.ratio || O >= 784 / this.ratio) &&
            (L = "#FFD230"), (Number(x) < -2 || 2 < Number(x)) &&
            (
              "5" === m &&
              (h >= 784 / this.ratio || A >= 784 / this.ratio) &&
              (L = "#FFD230"),
              "4" === m &&
              ((h >= 703 / this.ratio - 33 && h <= 703 / this.ratio + 33) ||
                (A >= 703 / this.ratio - 33 &&
                  A <= 703 / this.ratio + 33)) &&
              (L = "#FFD230"),
              (n = 576 / this.ratio * 2 - 137 - 703 / this.ratio + 33),
              "9" === m
            ) &&
            (h <= n || A <= n) &&
            (L = "#FFD230");
          break;
        default:
          0.2 < Number(S) &&
            (
              "1" === m && (W <= 103 || j <= 103) && (L = "#FFD230"),
              "2" === m &&
              ((W >= 201 / this.ratio - 33 && W <= 201 / this.ratio + 33) ||
                (j >= 201 / this.ratio - 33 &&
                  j <= 201 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "3" === m &&
              ((W >= 357 / this.ratio - 33 && W <= 357 / this.ratio + 33) ||
                (j >= 357 / this.ratio - 33 &&
                  j <= 357 / this.ratio + 33)) &&
              (L = "#FFD230"),
              (n = 683 / this.ratio + 157 - 33),
              "9" === m
            ) &&
            (j >= n || W >= n) &&
            (L = "#FFD230"), 0 < Number(r) &&
            (
              0 < Number(b) &&
              (
                "1" === m && (N <= 103 || M <= 103) && (L = "#FFD230"),
                "2" === m &&
                ((N >= 201 / this.ratio - 33 &&
                  N <= 201 / this.ratio + 33) ||
                  (M >= 201 / this.ratio - 33 &&
                    M <= 201 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "3" === m &&
                ((N >= 357 / this.ratio - 33 &&
                  N <= 357 / this.ratio + 33) ||
                  (M >= 357 / this.ratio - 33 &&
                    M <= 357 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "4" === m &&
                ((N >= 703 / this.ratio - 33 &&
                  N <= 703 / this.ratio + 33) ||
                  (M >= 703 / this.ratio - 33 &&
                    M <= 703 / this.ratio + 33)) &&
                (L = "#FFD230"),
                "5" === m
              ) &&
              (N >= 784 / this.ratio || M >= 784 / this.ratio) &&
              (L = "#FFD230"),
              Number(b) < 0
            ) &&
            (
              "5" === m &&
              (h >= 784 / this.ratio || A >= 784 / this.ratio) &&
              (L = "#FFD230"),
              "4" === m &&
              ((h >= 703 / this.ratio - 33 && h <= 703 / this.ratio + 33) ||
                (A >= 703 / this.ratio - 33 &&
                  A <= 703 / this.ratio + 33)) &&
              (L = "#FFD230"),
              (n = 576 / this.ratio * 2 - 137 - 703 / this.ratio + 33),
              "9" === m
            ) &&
            (h <= n || A <= n) &&
            (L = "#FFD230"), 2 < Number(x) &&
            (
              "6" === m && (q <= 103 || B <= 103) && (L = "#FFD230"),
              "7" === m &&
              ((q >= 201 / this.ratio - 33 && q <= 201 / this.ratio + 33) ||
                (B >= 201 / this.ratio - 33 &&
                  B <= 201 / this.ratio + 33)) &&
              (L = "#FFD230"),
              "8" === m
            ) &&
            ((q >= 357 / this.ratio - 33 && q <= 357 / this.ratio + 33) ||
              (B >= 357 / this.ratio - 33 && B <= 357 / this.ratio + 33)) &&
            (L = "#FFD230"), Number(x) < -2 &&
            (
              (n = 90 + 560 / this.ratio),
              "6" === m && (k >= n || G >= n) && (L = "#FFD230"),
              "7" === m &&
              ((k >= 359 / this.ratio + 193 - 33 &&
                k <= 359 / this.ratio + 193 + 33) ||
                (G >= 359 / this.ratio + 193 - 33 &&
                  G <= 359 / this.ratio + 193 + 33)) &&
              (L = "#FFD230"),
              "8" === m
            ) &&
            ((k >= 203 / this.ratio + 193 - 33 &&
              k <= 203 / this.ratio + 193 + 33) ||
              (G >= 203 / this.ratio + 193 - 33 &&
                G <= 203 / this.ratio + 193 + 33)) &&
            (L = "#FFD230");
      }
      (this.ctx.strokeStyle = L), this.ctx.fill(), this.ctx.stroke(), this.ctx.beginPath(), (this.ctx.lineCap =
        "none"), (this.ctx.shadowBlur = 0), (this.ctx.shadowOffsetY = 0), (this.ctx.lineWidth = 1), this.ctx.setLineDash(
          []
        ), this.ctx.arc(e, a, 16, 0, 360, !1), (this.ctx.fillStyle =
          "#DEF0FF"), (this.ctx.strokeStyle =
            "#DEF0FF"), this.ctx.fill(), this.ctx.stroke(), ((o = document.createElement(
              "img"
            )).src = ''), this.ctx.drawImage(
              o,
              e - 12,
              a - 12,
              24,
              24
            ), this.ctx.stroke(), "6" === m &&
        (
          this.ctx.beginPath(),
          (this.ctx.lineCap = "none"),
          (this.ctx.lineWidth = 1),
          this.ctx.setLineDash([1.5]),
          this.ctx.moveTo(e - 6, a),
          this.ctx.lineTo(e - 6 + 3 * Math.floor(Number(i) / 25), a),
          (this.ctx.strokeStyle = "#1793FF"),
          this.ctx.stroke()
        );
    },
    lineUtilStyle() {
      this.ctx.beginPath(), this.ctx.setLineDash([]), (this.ctx.lineCap =
        "round"), (this.ctx.shadowBlur = 4), (this.ctx.shadowOffsetY = 2), (this.ctx.shadowColor =
          "rgba(255,210,48,0.45)"), (this.ctx.lineWidth = 4);
    },
    lineTranslateDraw() {
      this.ctx.beginPath(), this.ctx.setLineDash([]), (this.ctx.lineCap =
        "round"), (this.ctx.shadowBlur = 4), (this.ctx.shadowOffsetY = 2), (this.ctx.shadowColor =
          "rgba(255,210,48,0.45)");
      var e = this.ctx.createLinearGradient(M, 53, N, 53);
      e.addColorStop(0, "rgba(255,209,48,0)"), e.addColorStop(
        0.5,
        "rgba(255,209,48,0.5)"
      ), e.addColorStop(
        1,
        "rgba(255,209,48,1)"
      ), (this.ctx.lineWidth = 4), this.ctx.moveTo(M, 53), this.ctx.lineTo(
        N,
        53
      ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    powerToLoadLineDraw() {
      this.lineUtilStyle();
      let e = null;
      h >= 576 / this.ratio && A >= 576 / this.ratio
        ? (e = this.ctx.createLinearGradient(h, 53, A, 53))
        : h < 576 / this.ratio && A >= 576 / this.ratio
          ? (e = this.ctx.createLinearGradient(
            576 / this.ratio,
            576 / this.ratio - h + 53,
            A,
            53
          ))
          : h < 576 / this.ratio &&
            h >= 576 / this.ratio - 137 &&
            A < 576 / this.ratio
            ? (e = this.ctx.createLinearGradient(
              576 / this.ratio,
              576 / this.ratio - h + 53,
              576 / this.ratio,
              576 / this.ratio - A + 53
            ))
            : h < 576 / this.ratio - 137 && A >= 576 / this.ratio - 137
              ? (e = this.ctx.createLinearGradient(
                576 / this.ratio * 2 - 137 - h,
                190,
                576 / this.ratio,
                576 / this.ratio - A + 53
              ))
              : h < 576 / this.ratio - 137 &&
              A < 576 / this.ratio - 137 &&
              (e = this.ctx.createLinearGradient(
                576 / this.ratio * 2 - 137 - h,
                190,
                576 / this.ratio * 2 - 137 - A,
                190
              )), e.addColorStop(0, "rgba(255,209,48,1)"), e.addColorStop(
                0.5,
                "rgba(255,209,48,0.5)"
              ), e.addColorStop(1, "rgba(255,209,48,0)"), h >= 576 / this.ratio &&
                A >= 576 / this.ratio
          ? (this.ctx.moveTo(A, 53), this.ctx.lineTo(h, 53))
          : h < 576 / this.ratio && A >= 576 / this.ratio
            ? (
              this.ctx.moveTo(A, 53),
              this.ctx.lineTo(576 / this.ratio, 53),
              this.ctx.lineTo(576 / this.ratio, 576 / this.ratio - h + 53)
            )
            : h < 576 / this.ratio &&
              h >= 576 / this.ratio - 137 &&
              A < 576 / this.ratio
              ? (
                this.ctx.moveTo(576 / this.ratio, 576 / this.ratio - A + 53),
                this.ctx.lineTo(576 / this.ratio, 576 / this.ratio - h + 53)
              )
              : h < 576 / this.ratio - 137 && A >= 576 / this.ratio - 137
                ? (
                  this.ctx.moveTo(
                    576 / this.ratio,
                    576 / this.ratio - A + 53
                  ),
                  this.ctx.lineTo(576 / this.ratio, 190),
                  this.ctx.lineTo(576 / this.ratio * 2 - 137 - h, 190)
                )
                : h < 576 / this.ratio - 137 &&
                A < 576 / this.ratio - 137 &&
                (
                  this.ctx.moveTo(576 / this.ratio * 2 - 137 - A, 190),
                  this.ctx.lineTo(576 / this.ratio * 2 - 137 - h, 190)
                ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    BMSToLoadDraw() {
      this.lineUtilStyle();
      let e = null;
      var a = 576 / this.ratio + 137;
      (e =
        W <= 576 / this.ratio && j <= 576 / this.ratio
          ? this.ctx.createLinearGradient(j, 53, W, 53)
          : W > 576 / this.ratio && j <= 576 / this.ratio
            ? this.ctx.createLinearGradient(
              j,
              53,
              576 / this.ratio,
              W - 576 / this.ratio + 53
            )
            : W <= a && j > 576 / this.ratio
              ? this.ctx.createLinearGradient(
                576 / this.ratio,
                j - 576 / this.ratio + 53,
                576 / this.ratio,
                W - 576 / this.ratio + 53
              )
              : W > a && j <= a
                ? this.ctx.createLinearGradient(
                  576 / this.ratio,
                  j - 576 / this.ratio + 53,
                  W - 137,
                  190
                )
                : this.ctx.createLinearGradient(
                  j - 137,
                  190,
                  W - 137,
                  190
                )).addColorStop(0, "rgba(255,209,48,0)"), e.addColorStop(
                  0.5,
                  "rgba(255,209,48,0.5)"
                ), e.addColorStop(1, "rgba(255,209,48,1)"), W <= 576 / this.ratio &&
                  j <= 576 / this.ratio
          ? (this.ctx.moveTo(j, 53), this.ctx.lineTo(W, 53))
          : W > 576 / this.ratio && j <= 576 / this.ratio
            ? (
              this.ctx.moveTo(j, 53),
              this.ctx.lineTo(576 / this.ratio, 53),
              this.ctx.lineTo(576 / this.ratio, W - 576 / this.ratio + 53)
            )
            : W <= a && j > 576 / this.ratio
              ? (
                this.ctx.moveTo(576 / this.ratio, j - 576 / this.ratio + 53),
                this.ctx.lineTo(576 / this.ratio, W - 576 / this.ratio + 53)
              )
              : (
                W > a && j <= a
                  ? (
                    this.ctx.moveTo(
                      576 / this.ratio,
                      j - 576 / this.ratio + 53
                    ),
                    this.ctx.lineTo(576 / this.ratio, 190)
                  )
                  : this.ctx.moveTo(j - 137, 190),
                this.ctx.lineTo(W - 137, 190)
              ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    powerToBMSDraw() {
      this.lineUtilStyle();
      var e = this.ctx.createLinearGradient(O, 53, H, 53);
      e.addColorStop(0, "rgba(255,209,48,1)"), e.addColorStop(
        0.5,
        "rgba(255,209,48,0.5)"
      ), e.addColorStop(1, "rgba(255,209,48,0)"), this.ctx.moveTo(
        H,
        53
      ), this.ctx.lineTo(
        O,
        53
      ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    BMSToNodeDraw() {
      this.lineUtilStyle();
      let e = null;
      (e =
        q <= 560 / this.ratio && B <= 560 / this.ratio
          ? this.ctx.createLinearGradient(B, 193, q, 193)
          : q > 560 / this.ratio && B <= 560 / this.ratio
            ? this.ctx.createLinearGradient(
              B,
              193,
              560 / this.ratio,
              193 - (q - 560 / this.ratio)
            )
            : this.ctx.createLinearGradient(
              560 / this.ratio,
              193 - (B - 560 / this.ratio),
              560 / this.ratio,
              193 - (q - 560 / this.ratio)
            )).addColorStop(0, "rgba(255,209,48,0)"), e.addColorStop(
              0.5,
              "rgba(255,209,48,0.5)"
            ), e.addColorStop(1, "rgba(255,209,48,1)"), q <= 560 / this.ratio &&
              B <= 560 / this.ratio
          ? (this.ctx.moveTo(B, 193), this.ctx.lineTo(q, 193))
          : (
            q > 560 / this.ratio && B <= 560 / this.ratio
              ? (
                this.ctx.moveTo(B, 193),
                this.ctx.lineTo(560 / this.ratio, 193)
              )
              : this.ctx.moveTo(
                560 / this.ratio,
                193 - (B - 560 / this.ratio)
              ),
            this.ctx.lineTo(560 / this.ratio, 193 - (q - 560 / this.ratio))
          ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    NodeToBMSDraw() {
      this.lineUtilStyle();
      let e = null;
      (e =
        k <= 193 && G <= 193
          ? this.ctx.createLinearGradient(
            560 / this.ratio,
            G,
            560 / this.ratio,
            k
          )
          : 193 < k && G <= 193
            ? this.ctx.createLinearGradient(
              560 / this.ratio,
              G,
              560 / this.ratio - (k - 193),
              193
            )
            : this.ctx.createLinearGradient(
              560 / this.ratio - (G - 193),
              193,
              560 / this.ratio - (k - 193),
              193
            )).addColorStop(0, "rgba(255,209,48,0)"), e.addColorStop(
              0.5,
              "rgba(255,209,48,0.5)"
            ), e.addColorStop(1, "rgba(255,209,48,1)"), k <= 193 && G <= 193
          ? (
            this.ctx.moveTo(560 / this.ratio, G),
            this.ctx.lineTo(560 / this.ratio, k)
          )
          : (
            193 < k && G <= 193
              ? (
                this.ctx.moveTo(560 / this.ratio, G),
                this.ctx.lineTo(560 / this.ratio, 193)
              )
              : this.ctx.moveTo(560 / this.ratio - (G - 193), 193),
            this.ctx.lineTo(560 / this.ratio - (k - 193), 193)
          ), (this.ctx.strokeStyle = e), this.ctx.stroke();
    },
    textDraw(e, a, t, m) {
      this.ctx.beginPath();
      var n = m ? "bold 14px PingFang SC" : "normal 12px PingFang SC";
      m =
        m && this.themeChange()
          ? "rgba(50,50,51,1)"
          : !m && this.themeChange()
            ? "rgba(0,0,0,0.65)"
            : m && !this.themeChange() ? "#F5F5F5" : "#E6E6E6";
      (this.ctx.font = n), (this.ctx.fillStyle = m), (this.ctx.textAlign =
        "center"), this.ctx.fill(), this.ctx.fillText(e, a, t);
    },
    themeChange: () => { }
  },
}
</script>
<style lang="less" scoped></style>
