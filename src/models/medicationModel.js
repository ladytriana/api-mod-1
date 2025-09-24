import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(name = null, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    let query = supabase
      .from("medications")
      .select(
        `
        id,
        sku,
        name,
        description,
        price,
        quantity,
        category_id,
        supplier_id
        `,
        { count: "exact" } // penting untuk pagination
      )
      .range(offset, offset + limit - 1);

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, 
        sku, 
        name, 
        description, 
        price, 
        quantity,
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
    const { error } = await supabase
      .from("medications")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  },

  async getTotal() {
    const { count, error } = await supabase
      .from("medications")
      .select("*", { count: "exact", head: true }); // hanya hitung jumlah

    if (error) throw error;
    return count;
  },


};
