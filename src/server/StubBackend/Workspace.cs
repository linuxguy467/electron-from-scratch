using System.Collections.Generic;

namespace server.StubBackend
{
  public class Workspace
  {
    public Workspace(string name, string folder, Dictionary<string, Project> projects)
    {
      Name = name;
      Folder = folder;
      Projects = projects;
    }

    public string Name { get; }
    public string Folder { get; }
    public Dictionary<string, Project> Projects { get; }
  }

  public class Project
  {
    public IEnumerable<Migration> Migrations { get; } = new[] {
        new Migration("001-init.sql"),
        new Migration("002-create-tables.sql"),
        new Migration("003-insert-data.sql"),
      };
  }

  public class Migration
  {
    public string Filename { get; }

    public Migration(string filename)
    {
      Filename = filename;
    }
  }
}