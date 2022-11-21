import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'message_topic'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("message_id")
        .unsigned()
        .references('messages.id')
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer("topic_id")
        .unsigned()
        .references('topics.id')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.unique(['message_id', 'topic_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
