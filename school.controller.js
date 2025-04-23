import connection from "./index.js";



const addSchool = async (req, res) => {

    try{

    const { name, latitude, longitude, address} = req.body;

    if (!name || !latitude || !longitude || !address) {
        return res.status(400).json({message: 'All fields are required!'})
    }

    const query = 'INSERT INTO schools ( name, latitude, longitude, address) VALUES ( ?, ?, ?, ?)';
     const [result] = await connection.promise().execute(query, [name, latitude, longitude, address]);


    
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
        const query = 'SELECT * FROM schools';
        const [schools] = await connection.promise().query(query);

        const sortedSchools = schools.sort((a, b) => a.name.localeCompare(b.name));

        res.json(sortedSchools);
    } catch (error) {
        console.error("Get School Error →", error);
        res.status(500).json({
            message: 'Error retrieving schools'
        });
    }
};

export { getSchool };

