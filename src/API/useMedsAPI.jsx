import axios from "axios";

export const useMedsAPI = async (medicine) => {
  try {
    const response = await axios.get(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${medicine}&pharmacyIds=1,2,3`,
    );
    return response.data ;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
