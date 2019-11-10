import graphene

import research_note.schema


class Query(research_note.schema.Query, graphene.ObjectType):
    pass


class Mutations(research_note.schema.Mutations, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutations)
