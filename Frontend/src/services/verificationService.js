import api from "./api";

export const registerParticipant = async (data) => {
  const formData = new FormData();

  formData.append("photo", data.photo);

  return api.post("/api/verification/register", formData, {
    params: {
      name: data.name,
      district: data.district,
      email: data.email,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const recognizeParticipant = async (photo) => {
  const formData = new FormData();

  formData.append("photo", photo);

  return api.post("/api/verification/recognize", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getParticipants = () => {
  return api.get("/api/verification/participants");
};

export const getLogs = () => {
  return api.get("/api/verification/logs");
};