import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
 **/
  Date: any,
};




export type ErrorType = {
   __typename?: 'ErrorType',
  field: Scalars['String'],
  messages: Array<Scalars['String']>,
};

export type IssueMutationInput = {
  date: Scalars['Date'],
  link: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type IssueMutationPayload = {
   __typename?: 'IssueMutationPayload',
  issue?: Maybe<IssueType>,
  errors?: Maybe<Array<Maybe<ErrorType>>>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type IssueType = {
   __typename?: 'IssueType',
  id: Scalars['ID'],
  date: Scalars['Date'],
  link: Scalars['String'],
  researchNotes: Array<ResearchNoteType>,
};

export type Mutations = {
   __typename?: 'Mutations',
  updateIssue?: Maybe<IssueMutationPayload>,
  updateResearchNote?: Maybe<ResearchNoteMutationPayload>,
  updateResearchNoteWritten?: Maybe<ResearchNoteWrittenMutationPayload>,
};


export type MutationsUpdateIssueArgs = {
  input: IssueMutationInput
};


export type MutationsUpdateResearchNoteArgs = {
  input: ResearchNoteMutationInput
};


export type MutationsUpdateResearchNoteWrittenArgs = {
  input: ResearchNoteWrittenMutationInput
};

export type Query = {
   __typename?: 'Query',
  issues?: Maybe<Array<Maybe<IssueType>>>,
  researchNotes?: Maybe<Array<Maybe<ResearchNoteType>>>,
};

export type ResearchNoteMutationInput = {
  title: Scalars['String'],
  issue: Scalars['ID'],
  content?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type ResearchNoteMutationPayload = {
   __typename?: 'ResearchNoteMutationPayload',
  researchNote?: Maybe<ResearchNoteType>,
  errors?: Maybe<Array<Maybe<ErrorType>>>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type ResearchNoteType = {
   __typename?: 'ResearchNoteType',
  id: Scalars['ID'],
  title: Scalars['String'],
  issue: IssueType,
  content?: Maybe<Scalars['String']>,
  isWritten: Scalars['Boolean'],
  writtenDate?: Maybe<Scalars['Date']>,
};

export type ResearchNoteWrittenMutationInput = {
  writtenDate?: Maybe<Scalars['Date']>,
  id?: Maybe<Scalars['ID']>,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type ResearchNoteWrittenMutationPayload = {
   __typename?: 'ResearchNoteWrittenMutationPayload',
  researchNote?: Maybe<ResearchNoteType>,
  errors?: Maybe<Array<Maybe<ErrorType>>>,
  clientMutationId?: Maybe<Scalars['String']>,
};


