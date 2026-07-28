import type { TribeOutLevel } from "./types";

export const LEVELS: readonly TribeOutLevel[] = [
  {
    "id": "level-001",
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "tutorialText": "Chạm vào nhân vật để họ chạy thoát!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-002",
    "boardRows": 3,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "tutorialText": "Nhân vật này đang cản đường nhân vật kia!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-003",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "tutorialText": "Bạn có thể xoay nhân vật bằng nút Xoay ở dưới!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-004",
    "boardRows": 3,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "tutorialText": "Dùng công tắc để mở cổng!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 3,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-005",
    "boardRows": 4,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "tutorialText": "Có những nhân vật chiếm nhiều hơn 1 ô!",
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-006",
    "boardRows": 3,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-007",
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-008",
    "boardRows": 3,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 4,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-009",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-010",
    "boardRows": 3,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-011",
    "boardRows": 4,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-012",
    "boardRows": 3,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-013",
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-014",
    "boardRows": 3,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-015",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-016",
    "boardRows": 3,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 3,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-017",
    "boardRows": 4,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-018",
    "boardRows": 3,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 28,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-019",
    "boardRows": 4,
    "boardCols": 4,
    "lives": 3,
    "timeLimit": 22,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-020",
    "boardRows": 3,
    "boardCols": 5,
    "lives": 3,
    "timeLimit": 25,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 4,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-021",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-022",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-023",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-024",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-025",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-026",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-027",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-028",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-029",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 3,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-030",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 3,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-031",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-032",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-033",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-034",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-035",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-036",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-037",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-038",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-039",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 30,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-040",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 34,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 4,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 4,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-041",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-042",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-043",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-044",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-045",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-046",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-047",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-048",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-049",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-050",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-051",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-052",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-053",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-054",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-055",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-056",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-057",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-058",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-059",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-060",
    "boardRows": 4,
    "boardCols": 7,
    "lives": 4,
    "timeLimit": 24,
    "rotateCharges": 0,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 1,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 6,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-061",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-062",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-063",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-064",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-065",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-066",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-067",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-068",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-069",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-070",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-071",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-072",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-073",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-074",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-075",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-076",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-077",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-078",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "down"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      },
      {
        "id": "o1",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 2,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-079",
    "boardRows": 4,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 1,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-080",
    "boardRows": 5,
    "boardCols": 6,
    "lives": 5,
    "timeLimit": 28,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 1,
        "col": 3,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-081",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-082",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-083",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-084",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-085",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-086",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-087",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-088",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-089",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-090",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 5,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-091",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-092",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-093",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-094",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-095",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-096",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-097",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-098",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  },
  {
    "id": "level-099",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "o0",
        "type": "obstacle",
        "assetKey": "rock",
        "row": 3,
        "col": 5,
        "width": 1,
        "height": 1
      }
    ]
  },
  {
    "id": "level-100",
    "boardRows": 5,
    "boardCols": 7,
    "lives": 6,
    "timeLimit": 32,
    "rotateCharges": 2,
    "entities": [
      {
        "id": "u0",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 0,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "s0",
        "type": "switch",
        "assetKey": "switch-inactive",
        "row": 0,
        "col": 2,
        "width": 1,
        "height": 1,
        "targetId": "g0",
        "activated": false
      },
      {
        "id": "g0",
        "type": "gate",
        "assetKey": "gate-closed",
        "row": 1,
        "col": 1,
        "width": 1,
        "height": 1,
        "open": false
      },
      {
        "id": "u1",
        "type": "unit",
        "assetKey": "villager-2",
        "row": 1,
        "col": 0,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u2",
        "type": "unit",
        "assetKey": "villager-3",
        "row": 1,
        "col": 2,
        "width": 1,
        "height": 1,
        "direction": "right"
      },
      {
        "id": "u3",
        "type": "unit",
        "assetKey": "villager-4",
        "row": 2,
        "col": 0,
        "width": 2,
        "height": 1,
        "direction": "right"
      }
    ]
  }
];

export const LEVEL_SET_VERSION = 2;
export const LEVEL_BY_ID: ReadonlyMap<TribeOutLevel["id"], TribeOutLevel> = new Map(LEVELS.map(level => [level.id, level] as const));
export const LEVEL_INDEX_BY_ID: ReadonlyMap<TribeOutLevel["id"], number> = new Map(LEVELS.map((level, index) => [level.id, index] as const));
