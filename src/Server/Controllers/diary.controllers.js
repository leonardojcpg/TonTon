import {
    createDiaryService,
    listDiaryService,
    listDiaryByIdService,
    updateDiaryByIdService,
    deleteDiaryByIdService,
  } from "../Services/diary.services.js";
  import AppError from "../Errors/App.error.js";
  
  export const createDiaryController = async (req, res) => {
    try {
      const diaryEntry = await createDiaryService(req.body);
      return res.status(201).json(diaryEntry);
    } catch (error) {
      throw new AppError("Error creating diary entry", error);
    }
  };
  
  export const listDiaryController = async (req, res) => {
    try {
      const diaryEntries = await listDiaryService();
      return res.status(200).json(diaryEntries);
    } catch (error) {
      throw new AppError("Error fetching diary entries", error);
    }
  };
  
  export const listDiaryByIdController = async (req, res) => {
    const diaryId = req.params.diaryId;
  
    try {
      const diaryEntry = await listDiaryByIdService(diaryId);
  
      if (!diaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }
  
      return res.status(200).json(diaryEntry);
    } catch (error) {
      throw new AppError("Error fetching diary entry by ID", error);
    }
  };
  
  export const updateDiaryByIdController = async (req, res) => {
    const diaryId = req.params.diaryId;
  
    try {
      const diaryEntry = await updateDiaryByIdService(diaryId, req.body);
  
      if (!diaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }
  
      return res.status(200).json(diaryEntry);
    } catch (error) {
      throw new AppError("Error updating diary entry by ID", error);
    }
  };
  
  export const deleteDiaryByIdController = async (req, res) => {
    const diaryId = req.params.diaryId;
  
    try {
      const diaryEntry = await deleteDiaryByIdService(diaryId);
  
      if (!diaryEntry) {
        return res.status(404).json({ error: "Diary entry not found" });
      }
  
      return res.status(204).json(diaryEntry);
    } catch (error) {
      throw new AppError("Error deleting diary entry by ID", error);
    }
  };
  