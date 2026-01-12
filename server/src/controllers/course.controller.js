


export const createCourse = async(req, res) => {
    try {
        const { tittle, description, amount } = req.body;
        const thumbnail = req.file;

        if (!tittle || !description || !amount) {
            res.status(401).json({
                success: false,
                message: "please provide all the details"
            });
        }

        let imageUrl = "";
        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64,{
            folder:"lmsYT"
        });
        imageUrl = uploadRes.secure_url;
        
    } catch (error) {
        console.log("error in creating course: ", error);
        res.status(500).json({
            success: false,
            message: "failed to create the course"
        });
    }
}