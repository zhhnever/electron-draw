let ElementCounts = {
  createNew: function () {
    let elementCounts = {}
    elementCounts = {
      KGStation: {
        XB: {
          user: 0,
          num: 0,
          power: 0
        },
        PD: {
          user: 0,
          num: 0,
          power: 0
        }
      },
      poleTypeTransformer: {
        user: 0,
        num: 0,
        power: 0
      },
      poleTypeTransformerPublic: {
        user: 0,
        num: 0,
        power: 0
      },
      DoublePower: {
        user: 0,
        num: 0,
        power: 0
      },
      link: {
        mainCable: 0,
        insulation: 0,
        uninsulation: 0,
        cable: 0,
        linkTotal: 0,
        cableTotal: 0
      },
      stationTotal: {
        user: 0,
        num: 0,
        power: 0
      }
    }
    return elementCounts
  }
}

export default ElementCounts
