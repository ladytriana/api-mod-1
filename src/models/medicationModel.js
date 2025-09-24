import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      );
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
        `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },

  async searchByName(name) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      )
      .ilike("name", `%${name}%`); // ilike for case-insensitive search
    if (error) throw error;
    return data;
  },

  async getAllWithPagination(page, limit) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id",
        { count: "exact" }
      )
      .range(from, to);
    if (error) throw error;

    return {
      data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  },
};
