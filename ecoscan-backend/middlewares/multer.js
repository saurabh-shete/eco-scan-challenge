import multer from "multer";

const storage = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
    
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
