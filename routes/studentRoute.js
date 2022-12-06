/*
 * The student router. To be used at endpoint /students
 */
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const Student = require('../models/studentModel.js');

// Get all students
router.get('/', (_, res) => {
  db.getAll(Student.tableName, (result) => {
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Get student by id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  db.getById(Student.tableName, id, (result) => {
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Add a student
router.post('/', (req, res) => {
  db.insert(Student.tableName, req.body, (_, newStudent) =>
    res.status(201).send(new Student(newStudent))
  );
});

// Delete a student by id
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  const condition = `ID = ${req.params.id}`;
  db.delete(Student.tableName, condition, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Delete all students
router.delete('/', (_, res) => {
  db.deleteAll(Student.tableName, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Update a student by id
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  const data = req.body,
    condition = `ID = ${req.params.id}`;
  db.update(Student.tableName, data, condition, (result) => {
    if (result.changedRows === 0) res.status(204).send();
    else res.send(result);
  });
});

module.exports = router;
