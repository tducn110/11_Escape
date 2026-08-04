import type { TribeOutLevel } from "./types";

export const LEVELS: readonly TribeOutLevel[] = [
  {
    "id": "level-001",
    "phase": 1,
    "boardRows": 3,
    "boardCols": 3,
    "lives": 3,
    "timeLimit": 14,
    "tutorialText": "Chạm vào nhân vật để họ chạy thoát!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-002",
    "phase": 1,
    "boardRows": 3,
    "boardCols": 3,
    "lives": 3,
    "timeLimit": 16,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-003",
    "phase": 1,
    "boardRows": 3,
    "boardCols": 3,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-004",
    "phase": 1,
    "boardRows": 3,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 16,
    "tutorialText": "Một số nhân vật đang cản đường người khác!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-005",
    "phase": 1,
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-006",
    "phase": 1,
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-007",
    "phase": 1,
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-008",
    "phase": 1,
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "left",
        "escaped": false
      },
      {
        "id": "u4",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-009",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "left",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      },
      {
        "id": "u4",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 3,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-010",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 16,
    "tutorialText": "Có những nhân vật chiếm nhiều hơn 1 ô!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 2,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-011",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 2,
        "col": 1,
        "width": 2,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "ob1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 4,
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 2,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-012",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 2,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 2,
        "col": 1,
        "width": 2,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u4",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 2,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-013",
    "phase": 1,
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 16,
    "tutorialText": "Chạm nút Xoay để xoay nhân vật tránh chướng ngại!",
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "ob1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-014",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 18,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "ob1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      }
    ]
  },
  {
    "id": "level-015",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "tutorialText": "Dùng công tắc để mở cổng!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 3,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 3,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      }
    ]
  },
  {
    "id": "level-016",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 3,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 2,
        "col": 3,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      }
    ]
  },
  {
    "id": "level-017",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 2,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 3,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 2,
        "col": 3,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      }
    ]
  },
  {
    "id": "level-018",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 20,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 2,
        "col": 2,
        "width": 2,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 2,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      }
    ]
  },
  {
    "id": "level-019",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 24,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-5",
        "row": 3,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "ob1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 4,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-020",
    "phase": 1,
    "boardRows": 5,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 26,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-6",
        "row": 2,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "g1",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-7",
        "row": 3,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-1",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right",
        "escaped": false
      },
      {
        "id": "s1",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 3,
        "width": 1,
        "height": 1,
        "targetId": "g1",
        "activated": false
      },
      {
        "id": "u4",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 4,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "up",
        "escaped": false
      },
      {
        "id": "ob1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 4,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-021",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-022",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-023",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-024",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-025",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-026",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-027",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-028",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-029",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-030",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-031",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-032",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-033",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-034",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-035",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-036",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-037",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-038",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-039",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-040",
    "phase": 2,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-041",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-042",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-043",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      }
    ]
  },
  {
    "id": "level-044",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-045",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-046",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-047",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-048",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-049",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-050",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-051",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-052",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-053",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-054",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-055",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-056",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-057",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-058",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-059",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-060",
    "phase": 3,
    "boardRows": 7,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 6,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 6,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 6,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-061",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-062",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-063",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-064",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-065",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-066",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-067",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-068",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-069",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-070",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-071",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-072",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-073",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-074",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-075",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-076",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-077",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-078",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-079",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-080",
    "phase": 4,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-081",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u11",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u12",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-082",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u11",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-083",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-084",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-085",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-086",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u11",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-087",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-088",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-089",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-090",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 5,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-091",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-092",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-093",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-094",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-095",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-096",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-097",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-098",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 1,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-099",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 5,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "proxy_obs",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-100",
    "phase": 5,
    "boardRows": 8,
    "boardCols": 8,
    "lives": 6,
    "timeLimit": 30,
    "rotateCharges": 5,
    "entities": [
      {
        "id": "gate1",
        "type": "gate",
        "row": 0,
        "col": 7,
        "open": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u0",
        "type": "unit",
        "row": 0,
        "col": 0,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs0",
        "type": "obstacle",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "u1",
        "type": "unit",
        "row": 0,
        "col": 2,
        "direction": "left",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs1",
        "type": "obstacle",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1
      },
      {
        "id": "u2",
        "type": "unit",
        "row": 0,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs2",
        "type": "obstacle",
        "row": 0,
        "col": 4,
        "width": 1,
        "height": 1
      },
      {
        "id": "u3",
        "type": "unit",
        "row": 0,
        "col": 5,
        "direction": "down",
        "width": 1,
        "height": 1
      },
      {
        "id": "obs3",
        "type": "obstacle",
        "row": 1,
        "col": 5,
        "width": 1,
        "height": 1
      },
      {
        "id": "sw1",
        "type": "switch",
        "row": 2,
        "col": 7,
        "targetId": "gate1",
        "activated": false,
        "width": 1,
        "height": 1
      },
      {
        "id": "u4",
        "type": "unit",
        "row": 2,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u5",
        "type": "unit",
        "row": 2,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u6",
        "type": "unit",
        "row": 2,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u7",
        "type": "unit",
        "row": 4,
        "col": 0,
        "direction": "right",
        "width": 1,
        "height": 2
      },
      {
        "id": "u8",
        "type": "unit",
        "row": 4,
        "col": 2,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u9",
        "type": "unit",
        "row": 4,
        "col": 3,
        "direction": "right",
        "width": 1,
        "height": 1
      },
      {
        "id": "u10",
        "type": "unit",
        "row": 4,
        "col": 4,
        "direction": "right",
        "width": 1,
        "height": 1
      }
    ]
  }
];

export const LEVEL_SET_VERSION = 3;
export const LEVEL_BY_ID: ReadonlyMap<TribeOutLevel["id"], TribeOutLevel> = new Map(LEVELS.map(level => [level.id, level] as const));
export const LEVEL_INDEX_BY_ID: ReadonlyMap<TribeOutLevel["id"], number> = new Map(LEVELS.map((level, index) => [level.id, index] as const));
