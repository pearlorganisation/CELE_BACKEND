import Eulogy from "../models/eulogy.js";


// Create a new eulogy
export const createEulogy = async (req, res) => {
    try {
        console.log(req.body);  // Log the data to see what's being sent
        const eulogy = new Eulogy(req.body);
        await eulogy.save();
        res.status(201).json({ message: "Eulogy created successfully", eulogy });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all eulogies
export const getEulogies = async (req, res) => {
    try {
        const eulogies = await Eulogy.find();
        res.status(200).json(eulogies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single eulogy by ID
export const getEulogyById = async (req, res) => {
    try {
        const eulogy = await Eulogy.findById(req.params.id);
        if (!eulogy) return res.status(404).json({ message: "Eulogy not found" });
        res.status(200).json(eulogy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

// Update a eulogy
export const updateEulogy = async (req, res) => {
    try {
        const updatedEulogy = await Eulogy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEulogy) return res.status(404).json({ message: "Eulogy not found" });
        res.status(200).json({ message: "Eulogy updated successfully", updatedEulogy });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a eulogy
export const deleteEulogy = async (req, res) => {
    try {
        const deletedEulogy = await Eulogy.findByIdAndDelete(req.params.id);
        if (!deletedEulogy) return res.status(404).json({ message: "Eulogy not found" });
        res.status(200).json({ message: "Eulogy deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
