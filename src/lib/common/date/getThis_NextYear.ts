const getThis_NextYear = () => {
    const year = new Date().getFullYear();
    return [year, year + 1];
};

export default  getThis_NextYear;
