/*
  Warnings:

  - A unique constraint covering the columns `[id_answer]` on the table `tb_forms_answers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[form_id,question_id]` on the table `tb_forms_answers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_forms_answers_id_answer_key` ON `tb_forms_answers`(`id_answer`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_forms_answers_form_id_question_id_key` ON `tb_forms_answers`(`form_id`, `question_id`);
