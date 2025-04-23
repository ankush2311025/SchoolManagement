import connection from "./db.js";



const addSchool = async (req, res) => {

    try{

    const { name, latitude, longitude, address} = req.body;

    if (!name || !latitude || !longitude || !address) {
        return res.status(400).json({message: 'All fields are required!'})
    }

    const query = 'INSERT INTO schools ( name, latitude, longitude, address) VALUES ( ?, ?, ?, ?)';
     const [result] = await connection.execute(query, [name, latitude, longitude, address]);


    
    res.json({
        message: 'School added successfully!',
        schoolId: result.insertId 
    });

    
    } catch (error){
        console.error("Add School Error →", error); 
        res.status(500).json({ message: 'error adding school'})
    }
};

 export { addSchool };


 const getSchool = async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLng = parseFloat(req.query.longitude);

        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({ message: 'Invalid or missing latitude/longitude in query parameters' });
        }

        const query = 'SELECT * FROM schools';
        const [schools] = await connection.query(query);

        const toRadians = degrees => degrees * Math.PI / 180;
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; 
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                      Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; 
        };

        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLng, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (error) {
        console.error("Get School Error →", error.message);
        res.status(500).json({ message: 'Error retrieving schools', error: error.message });
    }
};


export { getSchool };

