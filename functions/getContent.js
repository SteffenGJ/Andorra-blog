const getContent = async () => {
  return {
    success: false,
    data: { message: "Du har ingen profil. Gå til 'Opret profil'." },
  };
};

module.exports = getContent;
