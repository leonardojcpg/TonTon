import {
    createDiaperService,
    listDiapersService,
    listDiapersByIdService,
    updateDiaperByIdService,
    deleteDiaperByIdService,
  } from "../Services/diapers.services.js";
  import AppError from "../Errors/App.error.js";
  
  export const createDiaperController = async (req, res) => {
    try {
      const diaperRecord = await createDiaperService(req.body);
      return res.status(201).json(diaperRecord);
    } catch (error) {
      throw new AppError("Error creating diaper record", error);
    }
  };
  
  export const listDiapersController = async (req, res) => {
    try {
      const diaperRecords = await listDiapersService();
      return res.status(200).json(diaperRecords);
    } catch (error) {
      throw new AppError("Error fetching diaper records", error);
    }
  };
  
  export const listDiapersByIdController = async (req, res) => {
    const diaperId = req.params.diaperId;
  
    try {
      const diaperRecord = await listDiapersByIdService(diaperId);
  
      if (!diaperRecord) {
        return res.status(404).json({ error: "Diaper record not found" });
      }
  
      return res.status(200).json(diaperRecord);
    } catch (error) {
      throw new AppError("Error fetching diaper record by ID", error);
    }
  };
  
  export const updateDiaperByIdController = async (req, res) => {
    const diaperId = req.params.diaperId;
  
    try {
      const diaperRecord = await updateDiaperByIdService(diaperId, req.body);
  
      if (!diaperRecord) {
        return res.status(404).json({ error: "Diaper record not found" });
      }
  
      return res.status(200).json(diaperRecord);
    } catch (error) {
      throw new AppError("Error updating diaper record by ID", error);
    }
  };
  
  export const deleteDiaperByIdController = async (req, res) => {
    const diaperId = req.params.diaperId;
  
    try {
      const diaperRecord = await deleteDiaperByIdService(diaperId);
  
      if (!diaperRecord) {
        return res.status(404).json({ error: "Diaper record not found" });
      }
  
      return res.status(204).json(diaperRecord);
    } catch (error) {
      throw new AppError("Error deleting diaper record by ID", error);
    }
  };
  