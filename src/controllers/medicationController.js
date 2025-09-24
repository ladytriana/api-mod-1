import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const { name, page = 1, limit = 10 } = req.query;

      const meds = await MedicationModel.getAll(
        name,
        parseInt(page),
        parseInt(limit)
      );

      res.json(meds);
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

  async search(req, res) {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
      }
      const meds = await MedicationModel.searchByName(name);
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { price, quantity } = req.body;
      const errors = [];

      if (price < 0) {
        errors.push("Harga tidak boleh kurang dari 0");
      }
      if (quantity < 0) {
        errors.push("Stok tidak boleh kurang dari 0");
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(" & ") });
      }

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { price, quantity } = req.body;
      const errors = [];

      if (price < 0) {
        errors.push("Harga tidak boleh kurang dari 0");
      }
      if (quantity < 0) {
        errors.push("Stok tidak boleh kurang dari 0");
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(" & ") });
      }

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
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

 async getTotal(req, res) {
    try {
      const total = await MedicationModel.getTotal();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};
