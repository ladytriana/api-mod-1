import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const { name, page, limit } = req.query;

      // Prioritas pertama: pencarian
      if (name) {
        const meds = await MedicationModel.searchByName(name);
        return res.json(meds);
      }

      // Prioritas kedua: paginasi
      if (page !== undefined && limit !== undefined) {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const meds = await MedicationModel.getAllWithPagination(pageNum, limitNum);
        return res.json(meds);
      }

      // Default: semua data tanpa kriteria
      const meds = await MedicationModel.getAll();
      return res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      if (!med) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const med = await MedicationModel.update(req.params.id, req.body);
      if (!med) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Medication deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
