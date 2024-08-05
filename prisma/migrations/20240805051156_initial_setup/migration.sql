-- CreateTable
CREATE TABLE `tb_answer_options` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_type` INTEGER NOT NULL,
    `name` VARCHAR(45) NOT NULL,

    INDEX `fk_answes_option_type`(`answer_type`),
    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_answer_types` (
    `answer_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`answer_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_forms` (
    `form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NOT NULL,
    `group_id` INTEGER NOT NULL,

    INDEX `fk_form_group_idx`(`group_id`),
    PRIMARY KEY (`form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_forms_answers` (
    `id_answer` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `answer_id` INTEGER NOT NULL,

    INDEX `fk_answer_question_idx`(`answer_id`),
    INDEX `fk_form_answers_idx`(`form_id`),
    INDEX `fk_question_form_idx`(`question_id`),
    PRIMARY KEY (`id_answer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_groups` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(120) NOT NULL,
    `answer_type_id` INTEGER NOT NULL,
    `group_id` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `fk_answer_group_idx`(`group_id`),
    INDEX `fk_answer_type_question_idx`(`answer_type_id`),
    INDEX `fk_group_question_idx`(`group_id`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_answer_options` ADD CONSTRAINT `fk_answes_option_type` FOREIGN KEY (`answer_type`) REFERENCES `tb_answer_types`(`answer_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_forms` ADD CONSTRAINT `fk_form_group` FOREIGN KEY (`group_id`) REFERENCES `tb_groups`(`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_forms_answers` ADD CONSTRAINT `fk_answer_question` FOREIGN KEY (`answer_id`) REFERENCES `tb_answer_options`(`answer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_forms_answers` ADD CONSTRAINT `fk_form_answers` FOREIGN KEY (`form_id`) REFERENCES `tb_forms`(`form_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_forms_answers` ADD CONSTRAINT `fk_question_form` FOREIGN KEY (`question_id`) REFERENCES `tb_questions`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `fk_answer_type_question` FOREIGN KEY (`answer_type_id`) REFERENCES `tb_answer_types`(`answer_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_questions` ADD CONSTRAINT `fk_group_question` FOREIGN KEY (`group_id`) REFERENCES `tb_groups`(`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
