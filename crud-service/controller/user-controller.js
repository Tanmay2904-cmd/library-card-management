import User from '../model/user.js';

// Get all users
export const getUsers = async (request, response) => {
    try{
        console.log('Getting all users...');
        const users = await User.find();
        console.log('Users found:', users);
        response.status(200).json(users);
    }catch( error ){
        console.error('Error getting users:', error);
        response.status(404).json({ message: error.message })
    }
}

// Generate unique card number
const generateCardNumber = async () => {
    const prefix = 'LIB';
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
    const cardNumber = `${prefix}${randomNum}`;
    
    // Check if card number already exists
    const existingCard = await User.findOne({ cardNumber });
    if (existingCard) {
        return generateCardNumber(); // Try again if card number exists
    }
    
    return cardNumber;
}

// Save data of the user in database
export const addUser = async (request, response) => {
    const user = request.body;
    console.log('Adding new user:', user);
    
    try {
        // Generate card number
        const cardNumber = await generateCardNumber();
        
        // Create new user with card number
        const newUser = new User({
            ...user,
            cardNumber,
            issueDate: new Date(),
            status: 'active'
        });

        await newUser.save();
        console.log('User saved successfully:', newUser);
        response.status(201).json(newUser);
    } catch (error){
        console.error('Error saving user:', error);
        response.status(409).json({ message: error.message});     
    }
}

// Get a user by id
export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;
    try{
        await User.findByIdAndUpdate(request.params.id, user);
        response.status(201).json(user);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try{
        await User.findByIdAndDelete(request.params.id);
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}