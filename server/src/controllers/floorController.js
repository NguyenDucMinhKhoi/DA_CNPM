// controllers/floorController.js
const { Floor, Property } = require("../models");
const { v4: uuidv4 } = require("uuid");

// Get floors for a building
exports.getFloorsByBuilding = async (req, res) => {
    try {
        const { buildingId } = req.params;

        // Kiểm tra xem tòa nhà có tồn tại không
        const building = await Property.findByPk(buildingId);
        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }

        // Lấy tất cả các tầng của tòa nhà, sắp xếp theo tên (A-Z)
        const floors = await Floor.findAll({
            where: { property_id: buildingId },
            order: [['name', 'ASC']]
        });

        // Trả về danh sách tầng đã được định dạng lại
        res.status(200).json({
            message: "Fetched floors successfully",
            floors: floors.map(floor => ({
                id: floor.id,
                name: floor.name,
                property_id: floor.property_id
            }))
        });
    } catch (error) {
        console.error("Get Floors Error:", error);
        res.status(500).json({ message: "Server error when fetching floors" });
    }
};
// Giải thích:
// Mục đích: Trả về danh sách các tầng thuộc một tòa nhà cụ thể.
// Các bước:
// Kiểm tra sự tồn tại của tòa nhà: Tìm theo buildingId.
// Lấy tất cả các tầng thuộc tòa nhà đó từ bảng Floor.
// Trả về danh sách tầng đã được định dạng (chỉ trả về id, name, property_id).
// Sắp xếp các tầng theo thứ tự bảng chữ cái.


// Add a floor to a building
exports.addFloor = async (req, res) => {
    try {
        const { buildingId } = req.params;
        const { name } = req.body;

        // Kiểm tra xem tòa nhà có tồn tại không
        const building = await Property.findByPk(buildingId);
        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }

        // Kiểm tra xem tầng đã tồn tại trong tòa nhà này chưa
        const existingFloor = await Floor.findOne({
            where: {
                property_id: buildingId,
                name: name
            }
        });

        // Nếu tầng đã tồn tại, trả về lỗi 409 (Conflict)
        if (existingFloor) {
            return res.status(409).json({
                message: "A floor with this name already exists in this building",
                exists: true,
                floor: {
                    id: existingFloor.id,
                    name: existingFloor.name
                }
            });
        }

        // Tạo tầng mới
        const floor = await Floor.create({
            id: uuidv4(),
            name: name,
            property_id: buildingId
        });

        // Trả về thông tin tầng mới tạo
        res.status(201).json({
            message: "Floor added successfully",
            floor: {
                id: floor.id,
                name: floor.name,
                property_id: floor.property_id
            }
        });
    } catch (error) {
        console.error("Add Floor Error:", error);
        res.status(500).json({ message: "Server error when adding floor" });
    }
};
// Giải thích:
// Mục đích: Thêm một tầng mới vào tòa nhà.
// Các bước:
// Kiểm tra sự tồn tại của tòa nhà trước khi thêm tầng.
// Kiểm tra trùng lặp tầng: Nếu tầng đã tồn tại, trả về 409 Conflict.
// Tạo tầng mới nếu không trùng lặp.
// Trả về thông tin tầng mới tạo.


// Delete a floor
exports.deleteFloor = async (req, res) => {
  try {
    const { floorId } = req.params;
    
    // Tìm tầng theo ID
    const floor = await Floor.findByPk(floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }
    
    // Xóa tầng - điều này cũng sẽ xóa tất cả các phòng liên quan (cascade delete)
    await floor.destroy();
    
    res.status(200).json({ message: "Floor and all associated rooms deleted successfully" });
    
  } catch (error) {
    console.error("Delete Floor Error:", error);
    res.status(500).json({ message: "Server error when deleting floor" });
  }
};
//Mục đích: Xóa một tầng cụ thể.
// Các bước:
// Tìm tầng theo floorId.
// Kiểm tra tồn tại: Nếu không tìm thấy tầng, trả về 404 Not Found.
// Xóa tầng: Sử dụng .destroy(), sẽ tự động xóa tất cả các phòng liên quan (cascading delete).
// Trả về thông báo thành công.