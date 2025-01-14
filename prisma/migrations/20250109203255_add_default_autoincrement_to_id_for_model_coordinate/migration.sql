-- AlterTable
CREATE SEQUENCE coordinate_id_seq;
ALTER TABLE "Coordinate" ALTER COLUMN "id" SET DEFAULT nextval('coordinate_id_seq');
ALTER SEQUENCE coordinate_id_seq OWNED BY "Coordinate"."id";
