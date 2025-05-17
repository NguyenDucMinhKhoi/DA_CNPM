const { Property, User } = require('../models');

const createProperty = async (req, res) => {
  const { host_id, name, address, description, district_id, category_id } = req.body;

  try {
    // Kiểm tra xem host có tồn tại và đúng vai trò không
    const host = await User.findByPk(host_id);

    if (!host || host.role !== 'host') {
      return res.status(400).json({ message: 'Người dùng không hợp lệ. Chỉ host mới có thể tạo property.' });
    }

    const newProperty = await Property.create({
      host_id,
      name,
      address,
      description,
      district_id,
      category_id
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    console.error('Lỗi khi tạo property:', error);
    return res.status(500).json({ message: 'Có lỗi xảy ra khi tạo property.' });
  }
};

module.exports = {
  createProperty
};
