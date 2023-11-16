const { User} = require('../models');
const { userSchema } = require('../helper/validateAttribute');

exports.getUser = async (req, res) => {
    try{
        const response = await User.findAll()
        res.status(200).json({ data: response, message: 'Success' })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam menampilkan list user' });
    }
}

exports.addUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const { error } = userSchema.validate({ name, email, password });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Cek apakah email sudah digunakan
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // Buat user baru
        const newUser = await User.create({ name, email, password });

        res.status(201).json({ message: 'User berhasil ditambahkan', data: newUser });

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan user' });
    }
}

exports.editUser = async (req, res) => {
    try{
        const { userId } = req.params;
        const { name, email, password } = req.body;

        // Validasi data menggunakan schema Joi
        const { error } = userSchema.validate({ name, email, password });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Cek apakah pengguna dengan ID yang diberikan ada
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Update data pengguna
        await existingUser.update({ name, email, password });

        res.status(200).json({ message: 'Data pengguna berhasil diperbarui', data: existingUser });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengedit data pengguna' });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const { userId } = req.params

        const existingUser = await User.findByPk(userId)

        if(!existingUser){
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        await existingUser.destroy();

        res.status(200).json({ message: 'Pengguna berhasil dihapus' });

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus pengguna' });
    }
}