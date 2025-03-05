import express from 'express';

export const bodyParser = [
  express.json({ limit: '10mb' }),
  express.urlencoded({ extended: true, limit: '10mb' }),
  express.raw({ type: 'application/vnd.custom-type' }),
  express.text({ type: 'text/html' })
];