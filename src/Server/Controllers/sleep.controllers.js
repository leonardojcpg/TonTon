import {
    createSleepService,
    listSleepService,
    listSleepByIdService,
    updateSleepByIdService,
    deleteSleepByIdService,
  } from "../Services/sleep.services.js";
  import AppError from "../Errors/App.error.js";
  
  export const createSleepController = async (req, res) => {
    try {
      const sleepRecord = await createSleepService(req.body);
      return res.status(201).json(sleepRecord);
    } catch (error) {
      throw new AppError("Error creating sleep record", error);
    }
  };
  
  export const listSleepController = async (req, res) => {
    try {
      const sleepRecords = await listSleepService();
      return res.status(200).json(sleepRecords);
    } catch (error) {
      throw new AppError("Error fetching sleep records", error);
    }
  };
  
  export const listSleepByIdController = async (req, res) => {
    const sleepId = req.params.sleepId;
  
    try {
      const sleepRecord = await listSleepByIdService(sleepId);
  
      if (!sleepRecord) {
        return res.status(404).json({ error: "Sleep record not found" });
      }
  
      return res.status(200).json(sleepRecord);
    } catch (error) {
      throw new AppError("Error fetching sleep record by ID", error);
    }
  };
  
  export const updateSleepByIdController = async (req, res) => {
    const sleepId = req.params.sleepId;
  
    try {
      const sleepRecord = await updateSleepByIdService(sleepId, req.body);
  
      if (!sleepRecord) {
        return res.status(404).json({ error: "Sleep record not found" });
      }
  
      return res.status(200).json(sleepRecord);
    } catch (error) {
      throw new AppError("Error updating sleep record by ID", error);
    }
  };
  
  export const deleteSleepByIdController = async (req, res) => {
    const sleepId = req.params.sleepId;
  
    try {
      const sleepRecord = await deleteSleepByIdService(sleepId);
  
      if (!sleepRecord) {
        return res.status(404).json({ error: "Sleep record not found" });
      }
  
      return res.status(204).json(sleepRecord);
    } catch (error) {
      throw new AppError("Error deleting sleep record by ID", error);
    }
  };
  