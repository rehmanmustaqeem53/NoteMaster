
import Note from "../models/noteModel.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      isImportant,
      dueDate,
    } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      description,
      category: category || "Personal",
      isImportant: isImportant ?? false,
      dueDate: dueDate || null,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL NOTES
export const getAllNotes = async (req, res) => {
  try {
    const { search, category, important } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (search?.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (important === "true") {
      filter.isImportant = true;
    }

    const notes = await Note.find(filter).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      totalNotes: notes.length,
      notes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE NOTE
export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "category",
      "isImportant",
      "dueDate",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (updates.title !== undefined) {
      if (!updates.title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }

      updates.title = updates.title.trim();
    }

    if (updates.description !== undefined && !updates.description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description cannot be empty",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
