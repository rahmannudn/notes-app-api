const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHander = function (request, h) {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "catatan gagal ditambahkan",
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
  });
  return response;
};

const getNotesByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((data) => data.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((data) => data.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    console.log(notes[index]);

    const response = h.response({
      status: "success",
      message: "catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "catatan gagal diperbarui",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const noteIndex = notes.findIndex((data) => data.id === id);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    const response = h.response({
      status: "success",
      message: "note berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "note gagal dihapus. id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHander,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
