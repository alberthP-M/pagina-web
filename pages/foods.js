import { useEffect, useState } from "react";
import { RiEdit2Line, RiDeleteBin6Line, RiAddLine } from "react-icons/ri";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import Layout from "../components/shared/layout";
import withAuth from "../components/withAuth";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/foods/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [token]);

  const openModal = (food = null) => {
    fetchCategories();
    if (food) {
      setEditingFood(food);
      setName(food.name);
      setDescription(food.description);
      setPrice(food.price);
      setCategory(food.category);
    } else {
      setEditingFood(null);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingFood) {
        await axios.patch(
          `http://localhost:3000/api/foods/${editingFood.id}`,
          {
            name,
            description,
            price,
            category,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/foods/",
          {
            name,
            description,
            price,
            category,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setIsOpen(false);
      fetchFoods();
    } catch (error) {
      console.error("Error saving food:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta comida?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/foods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(foods.filter((food) => food.id !== id));
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <>
      <Layout title="Comidas" description="Gestión de comidas">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-title">Comidas</h2>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#012970] dark:bg-[#ec7c6a] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
            >
              <RiAddLine /> Crear
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Descripción</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{food.name}</td>
                    <td className="px-4 py-2">{food.description}</td>
                    <td className="px-4 py-2">{food.price} Bs.</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => openModal(food)}
                        className="btn-edit"
                      >
                        <RiEdit2Line className="text-base sm:text-lg md:text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="btn-delete"
                      >
                        <RiDeleteBin6Line className="text-base sm:text-lg md:text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-title">
            {editingFood ? "Editar Comida" : "Nueva Comida"}
          </Dialog.Title>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Nombre"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción:
            </label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Descripción"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Precio:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Precio"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Categoria:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:opacity-90"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#012970] dark:bg-[#ec7c6a] text-white rounded-md hover:opacity-90"
            >
              {editingFood ? "Actualizar" : "Crear"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default withAuth(Foods);
