import connection from "./index.js";
import haversine from "haversine";


const addSchool = async (req, res) => {

    try{

    const { name, latitude, longitude, address} = req.body;

    const query = 'INSERT INTO school ( name, latitude, longitude, address) VALUES ( ?, ?, ?, ?)';

   
    const[result] = await connection.execute(query, [  name, latitude, longitude, address]);
    res.json({
        message: 'School added successfully!', schoolid: result.insertId
    });
    
    } catch (error){
        console.error("Add School Error →", error); // 👀 This will reveal the true issue
        res.status(500).json({ message: 'error adding school'})
    }
};

 export { addSchool };



 const getSchools = async (req, res) => {
    try{
        const{ latitude, longitude}= req.query;
        const query = 'SELECT * FROM school';
        const [school]= await connection.execute(query);

        const schooldistance = school.map((school) => {
            const distance = haversine({latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
                {latitude: school.latitude,
                    longitude: school.longitude
                },
                {units :'km'}
            );
            return{...school, distance};  
            
        });

        schooldistance.sort((a,b ) =>
        a.distance -b.distance);
        res.json(schooldistance);
    }catch (error) {
        res.status(500).json({
            message: 'Error retrieving schools'
        });
    }
 };

 export {getSchools};

