import mongoose from "mongoose";

const eulogySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthCountry: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfDeath: { type: Date, required: true },
    locationBody: { type: String },
    parents: { type: String, required: true },
    siblings: { type: String },
    education: { type: String },
    career: { type: String },
    spouseChildren: { type: String },
    religion: { type: String },
    sicknessDemise: { type: String },
}, { timestamps: true });

const Eulogy = mongoose.model("Eulogy", eulogySchema);

export default Eulogy;
