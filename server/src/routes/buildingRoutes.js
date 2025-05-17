// routes/buildingRoutes.js
const express = require("express");
const router = express.Router();
const buildingController = require("../controllers/buildingController");
const floorController = require("../controllers/floorController");

// Building routes
router.get("/", buildingController.getAllBuildings);  // Lấy danh sách tất cả tòa nhà
router.post("/", buildingController.createBuilding);  // Tạo mới một tòa nhà
router.get("/:buildingId", buildingController.getBuildingById);  // Lấy thông tin tòa nhà theo ID
router.get("/check-name/:buildingName", buildingController.checkBuilding);  // Kiểm tra tòa nhà theo tên
router.delete("/:buildingId", buildingController.deleteBuilding);  // Xóa tòa nhà theo ID


// Floor routes
router.get("/:buildingId/floors", floorController.getFloorsByBuilding);  // Lấy tất cả tầng trong tòa nhà
router.post("/:buildingId/floors", floorController.addFloor);  // Thêm tầng mới vào tòa nhà
router.delete("/floors/:floorId", floorController.deleteFloor);  // Xóa tầng theo ID

module.exports = router;

// 🔹 Building routes:
// GET /buildings/ - Lấy danh sách tất cả các tòa nhà.
// POST /buildings/ - Tạo mới một tòa nhà.
// GET /buildings/:buildingName - Kiểm tra xem tòa nhà có tồn tại không (theo tên).
// DELETE /buildings/:buildingId - Xóa tòa nhà theo ID.

// 🔹 Floor routes:
// GET /buildings/:buildingId/floors - Lấy danh sách tất cả tầng của một tòa nhà.
// POST /buildings/:buildingId/floors - Thêm tầng mới vào tòa nhà.
// DELETE /buildings/floors/:floorId - Xóa tầng theo ID.