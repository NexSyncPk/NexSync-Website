const multer = require("multer");
const path = require("path");

// Team Member Picture Storage
const pictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/teamMembers/"); // Folder for team pictures
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// Resume Storage
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes/"); // Folder for resumes
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

// Hero Image Storage
const heroImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/heroImages/"); // Folder for hero images
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const uploadPicture = multer({ storage: pictureStorage });
const uploadResume = multer({ storage: resumeStorage });
const uploadHeroImage = multer({ storage: heroImageStorage });

module.exports = {
  uploadPicture,
  uploadResume,
  uploadHeroImage,
};
